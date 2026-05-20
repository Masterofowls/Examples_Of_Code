-- 12_chat_auth_seed.sql

INSERT INTO app_users (
  user_id, username, email, password_hash, password_algo,
  is_email_verified, account_status, created_at, updated_at
) VALUES
  (1, 'alice', 'alice@chat.example', 'hash_alice', 'argon2id', TRUE, 'active', '2026-05-01 08:00:00', '2026-05-01 08:00:00'),
  (2, 'bob', 'bob@chat.example', 'hash_bob', 'argon2id', TRUE, 'active', '2026-05-01 08:05:00', '2026-05-01 08:05:00'),
  (3, 'carol', 'carol@chat.example', 'hash_carol', 'argon2id', FALSE, 'active', '2026-05-01 08:10:00', '2026-05-01 08:10:00');

INSERT INTO auth_identities (identity_id, user_id, provider, provider_subject, created_at) VALUES
  (1, 1, 'password', 'alice@chat.example', '2026-05-01 08:00:00'),
  (2, 2, 'password', 'bob@chat.example', '2026-05-01 08:05:00'),
  (3, 3, 'google', 'google-oauth2|carol-123', '2026-05-01 08:10:00');

INSERT INTO mfa_factors (factor_id, user_id, factor_type, secret_encrypted, backup_code_hash, is_enabled, created_at) VALUES
  (1, 1, 'totp', 'enc_totp_secret_1', NULL, TRUE, '2026-05-02 09:00:00'),
  (2, 2, 'backup_code', NULL, 'backup_hash_bob', TRUE, '2026-05-02 09:10:00');

INSERT INTO user_sessions (session_id, user_id, device_name, ip_address, user_agent, created_at, expires_at, revoked_at) VALUES
  (1001, 1, 'Chrome on Windows', '203.0.113.10', 'Mozilla/5.0 ...', '2026-05-20 09:00:00', '2026-05-27 09:00:00', NULL),
  (1002, 2, 'Safari on iPhone', '203.0.113.11', 'Mozilla/5.0 ...', '2026-05-20 09:10:00', '2026-05-27 09:10:00', NULL);

INSERT INTO refresh_tokens (token_id, session_id, token_hash, issued_at, expires_at, revoked_at, replaced_by_token_id) VALUES
  (5001, 1001, 'rt_hash_alice_1', '2026-05-20 09:00:00', '2026-06-20 09:00:00', NULL, NULL),
  (5002, 1002, 'rt_hash_bob_1', '2026-05-20 09:10:00', '2026-06-20 09:10:00', NULL, NULL);

INSERT INTO password_reset_tokens (reset_id, user_id, token_hash, expires_at, used_at, created_at) VALUES
  (9001, 3, 'pr_hash_carol_1', '2026-05-20 12:30:00', NULL, '2026-05-20 11:30:00');

INSERT INTO chat_rooms (room_id, room_type, room_name, created_by, created_at) VALUES
  (2001, 'group', 'backend-team', 1, '2026-05-10 10:00:00'),
  (2002, 'direct', NULL, 1, '2026-05-10 10:05:00');

INSERT INTO chat_room_members (room_id, user_id, role_name, joined_at, last_read_message_id, muted_until) VALUES
  (2001, 1, 'owner', '2026-05-10 10:00:00', 3002, NULL),
  (2001, 2, 'member', '2026-05-10 10:01:00', 3001, NULL),
  (2001, 3, 'member', '2026-05-10 10:02:00', NULL, NULL),
  (2002, 1, 'member', '2026-05-10 10:05:00', 3004, NULL),
  (2002, 2, 'member', '2026-05-10 10:05:00', 3004, NULL);

INSERT INTO messages (
  message_id, room_id, sender_user_id, message_text, sent_at, edited_at, is_deleted, parent_message_id
) VALUES
  (3001, 2001, 1, 'Morning team, standup in 10 mins.', '2026-05-20 09:00:00', NULL, FALSE, NULL),
  (3002, 2001, 2, 'Got it.', '2026-05-20 09:01:00', NULL, FALSE, 3001),
  (3003, 2001, 3, 'I might be 5 mins late.', '2026-05-20 09:02:00', NULL, FALSE, 3001),
  (3004, 2002, 1, 'Can you review my PR?', '2026-05-20 09:03:00', NULL, FALSE, NULL);

INSERT INTO message_receipts (message_id, user_id, delivered_at, read_at) VALUES
  (3001, 2, '2026-05-20 09:00:01', '2026-05-20 09:00:40'),
  (3001, 3, '2026-05-20 09:00:02', NULL),
  (3002, 1, '2026-05-20 09:01:01', '2026-05-20 09:01:20'),
  (3003, 1, '2026-05-20 09:02:01', NULL),
  (3004, 2, '2026-05-20 09:03:01', '2026-05-20 09:04:00');

INSERT INTO presence_state (user_id, status_text, last_seen_at, updated_at) VALUES
  (1, 'online', '2026-05-20 09:15:00', '2026-05-20 09:15:00'),
  (2, 'away', '2026-05-20 09:12:00', '2026-05-20 09:12:00'),
  (3, 'online', '2026-05-20 09:14:30', '2026-05-20 09:14:30');

INSERT INTO typing_events (room_id, user_id, started_at, expires_at) VALUES
  (2001, 3, '2026-05-20 09:15:10', '2026-05-20 09:15:20');
