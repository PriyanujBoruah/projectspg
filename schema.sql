-- =========================================================================
-- Standalone Data De-identification & Reversible Tokenization Engine Schema
-- Database: Cloudflare D1 (SQLite)
-- =========================================================================

CREATE TABLE IF NOT EXISTS token_sessions (
    session_id TEXT PRIMARY KEY,
    mapping_json TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for sub-millisecond session lookup & TTL expiration queries
CREATE INDEX IF NOT EXISTS idx_token_sessions_expires_at ON token_sessions(expires_at);

-- =========================================================================
-- API Key Authentication, Rate Limiting & Usage Metering Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    name TEXT NOT NULL,
    tier TEXT DEFAULT 'free',
    monthly_quota INTEGER DEFAULT 10000,
    requests_used INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);

