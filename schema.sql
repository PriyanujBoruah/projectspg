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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT DEFAULT 'anonymous',
    byok_google_key TEXT,
    byok_mistral_key TEXT,
    byok_groq_key TEXT
);

CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);

-- =========================================================================
-- User Profiles & Enterprise Access Level Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    org TEXT,
    org_website TEXT,
    invitation_code TEXT,
    access_level TEXT DEFAULT 'Limited Access',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- =========================================================================
-- Admin Invitation Codes Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS invitation_codes (
    code TEXT PRIMARY KEY,
    description TEXT,
    max_uses INTEGER DEFAULT 1,
    uses_count INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invitation_codes_active ON invitation_codes(is_active);

