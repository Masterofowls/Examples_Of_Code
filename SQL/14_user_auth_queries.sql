-- 14_user_auth_queries.sql

-- 1) Sign-up (application should hash password before insert)
INSERT INTO app_users (
  user_id, username, email, password_hash, password_algo,
  is_email_verified, account_status, created_at, updated_at
) VALUES (
  :user_id, :username, :email, :password_hash, 'argon2id',
  FALSE, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

INSERT INTO auth_identities (identity_id, user_id, provider, provider_subject, created_at)
VALUES (:identity_id, :user_id, 'password', :email, CURRENT_TIMESTAMP);

-- 2) Login lookup by email (check hash in application code)
SELECT user_id, email, password_hash, account_status, is_email_verified
FROM app_users
WHERE email = :email;

-- 3) Create session + refresh token in one transaction
BEGIN;

INSERT INTO user_sessions (
  session_id, user_id, device_name, ip_address, user_agent,
  created_at, expires_at, revoked_at
) VALUES (
  :session_id, :user_id, :device_name, :ip_address, :user_agent,
  CURRENT_TIMESTAMP, :session_expires_at, NULL
);

INSERT INTO refresh_tokens (
  token_id, session_id, token_hash, issued_at, expires_at, revoked_at, replaced_by_token_id
) VALUES (
  :token_id, :session_id, :token_hash, CURRENT_TIMESTAMP, :token_expires_at, NULL, NULL
);

COMMIT;

-- 4) Refresh token rotation (revoke old, insert new)
BEGIN;

UPDATE refresh_tokens
SET revoked_at = CURRENT_TIMESTAMP,
    replaced_by_token_id = :new_token_id
WHERE token_hash = :old_token_hash
  AND revoked_at IS NULL
  AND expires_at > CURRENT_TIMESTAMP;

INSERT INTO refresh_tokens (
  token_id, session_id, token_hash, issued_at, expires_at, revoked_at, replaced_by_token_id
)
SELECT
  :new_token_id,
  rt.session_id,
  :new_token_hash,
  CURRENT_TIMESTAMP,
  :new_expires_at,
  NULL,
  NULL
FROM refresh_tokens rt
WHERE rt.token_hash = :old_token_hash;

COMMIT;

-- 5) Global logout: revoke all active sessions for user
UPDATE user_sessions
SET revoked_at = CURRENT_TIMESTAMP
WHERE user_id = :user_id
  AND revoked_at IS NULL;

UPDATE refresh_tokens
SET revoked_at = CURRENT_TIMESTAMP
WHERE session_id IN (
  SELECT session_id
  FROM user_sessions
  WHERE user_id = :user_id
);

-- 6) Create password reset token
INSERT INTO password_reset_tokens (
  reset_id, user_id, token_hash, expires_at, used_at, created_at
) VALUES (
  :reset_id, :user_id, :token_hash, :expires_at, NULL, CURRENT_TIMESTAMP
);

-- 7) Consume password reset token + update password atomically
BEGIN;

UPDATE app_users
SET password_hash = :new_password_hash,
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = (
  SELECT prt.user_id
  FROM password_reset_tokens prt
  WHERE prt.token_hash = :token_hash
    AND prt.used_at IS NULL
    AND prt.expires_at > CURRENT_TIMESTAMP
);

UPDATE password_reset_tokens
SET used_at = CURRENT_TIMESTAMP
WHERE token_hash = :token_hash
  AND used_at IS NULL
  AND expires_at > CURRENT_TIMESTAMP;

COMMIT;

-- 8) MFA challenge check (TOTP factor enabled)
SELECT factor_id, user_id, factor_type, secret_encrypted, is_enabled
FROM mfa_factors
WHERE user_id = :user_id
  AND factor_type = 'totp'
  AND is_enabled = TRUE;
