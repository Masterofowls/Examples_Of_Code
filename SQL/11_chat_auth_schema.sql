-- 11_chat_auth_schema.sql
-- Realtime chat + authentication relations schema

DROP TABLE IF EXISTS typing_events;
DROP TABLE IF EXISTS presence_state;
DROP TABLE IF EXISTS message_receipts;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_room_members;
DROP TABLE IF EXISTS chat_rooms;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS refresh_tokens;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS mfa_factors;
DROP TABLE IF EXISTS auth_identities;
DROP TABLE IF EXISTS app_users;

CREATE TABLE app_users (
  user_id BIGINT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  password_algo VARCHAR(30) NOT NULL DEFAULT 'argon2id',
  is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  account_status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE auth_identities (
  identity_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  provider VARCHAR(40) NOT NULL,
  provider_subject VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  UNIQUE (provider, provider_subject),
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE mfa_factors (
  factor_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  factor_type VARCHAR(20) NOT NULL,
  secret_encrypted VARCHAR(400),
  backup_code_hash VARCHAR(255),
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE user_sessions (
  session_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  device_name VARCHAR(120),
  ip_address VARCHAR(64),
  user_agent VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE refresh_tokens (
  token_id BIGINT PRIMARY KEY,
  session_id BIGINT NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  issued_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  replaced_by_token_id BIGINT,
  FOREIGN KEY (session_id) REFERENCES user_sessions(session_id),
  FOREIGN KEY (replaced_by_token_id) REFERENCES refresh_tokens(token_id)
);

CREATE TABLE password_reset_tokens (
  reset_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE chat_rooms (
  room_id BIGINT PRIMARY KEY,
  room_type VARCHAR(20) NOT NULL,
  room_name VARCHAR(120),
  created_by BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (created_by) REFERENCES app_users(user_id)
);

CREATE TABLE chat_room_members (
  room_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  role_name VARCHAR(20) NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP NOT NULL,
  last_read_message_id BIGINT,
  muted_until TIMESTAMP,
  PRIMARY KEY (room_id, user_id),
  FOREIGN KEY (room_id) REFERENCES chat_rooms(room_id),
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE messages (
  message_id BIGINT PRIMARY KEY,
  room_id BIGINT NOT NULL,
  sender_user_id BIGINT NOT NULL,
  message_text TEXT NOT NULL,
  sent_at TIMESTAMP NOT NULL,
  edited_at TIMESTAMP,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  parent_message_id BIGINT,
  FOREIGN KEY (room_id) REFERENCES chat_rooms(room_id),
  FOREIGN KEY (sender_user_id) REFERENCES app_users(user_id),
  FOREIGN KEY (parent_message_id) REFERENCES messages(message_id)
);

CREATE TABLE message_receipts (
  message_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  delivered_at TIMESTAMP,
  read_at TIMESTAMP,
  PRIMARY KEY (message_id, user_id),
  FOREIGN KEY (message_id) REFERENCES messages(message_id),
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE presence_state (
  user_id BIGINT PRIMARY KEY,
  status_text VARCHAR(20) NOT NULL,
  last_seen_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE TABLE typing_events (
  room_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  started_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  PRIMARY KEY (room_id, user_id),
  FOREIGN KEY (room_id) REFERENCES chat_rooms(room_id),
  FOREIGN KEY (user_id) REFERENCES app_users(user_id)
);

CREATE INDEX idx_sessions_user_expires ON user_sessions(user_id, expires_at);
CREATE INDEX idx_refresh_session_expires ON refresh_tokens(session_id, expires_at);
CREATE INDEX idx_rooms_creator ON chat_rooms(created_by);
CREATE INDEX idx_messages_room_time ON messages(room_id, sent_at);
CREATE INDEX idx_messages_sender_time ON messages(sender_user_id, sent_at);
CREATE INDEX idx_receipts_user_read ON message_receipts(user_id, read_at);
CREATE INDEX idx_typing_room_expires ON typing_events(room_id, expires_at);
