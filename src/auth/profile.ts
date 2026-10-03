/**
 * User Profile & Invitation Access Management Module
 * Manages post-login invitation/referral onboarding and access tagging.
 * Supports Cloudflare D1 SQL storage with in-memory fallback.
 */

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  org: string;
  orgWebsite: string;
  invitationCode: string;
  accessLevel: "Full Access" | "Limited Access";
  createdAt: string;
  updatedAt: string;
}

// In-memory fallback cache for isolates or environments without Cloudflare D1
const localProfileStore = new Map<string, UserProfile>();

let isTableInitialized = false;

async function ensureTable(d1: any) {
  if (isTableInitialized || !d1) return;
  try {
    await d1
      .prepare(
        `CREATE TABLE IF NOT EXISTS user_profiles (
          user_id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          org TEXT,
          org_website TEXT,
          invitation_code TEXT,
          access_level TEXT DEFAULT 'Limited Access',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      )
      .run();
    isTableInitialized = true;
  } catch (err) {
    console.error("Failed to ensure user_profiles table:", err);
  }
}

/**
 * Validates invitation/referral codes.
 * Accepts standard invitation formats or referral keys (e.g. SPG-*, INVITE-*, or non-empty string).
 */
export function validateInvitationCode(code?: string): boolean {
  if (!code) return false;
  const trimmed = code.trim();
  return trimmed.length >= 3;
}

/**
 * Retrieve user profile by user ID
 */
export async function getUserProfile(
  env: any,
  userId: string
): Promise<UserProfile | null> {
  if (!userId) return null;

  // 1. Try D1 database if available
  if (env?.DB) {
    try {
      await ensureTable(env.DB);
      const row: any = await env.DB.prepare(
        `SELECT user_id, name, email, org, org_website, invitation_code, access_level, created_at, updated_at
         FROM user_profiles WHERE user_id = ?`
      )
        .bind(userId)
        .first();

      if (row) {
        const profile: UserProfile = {
          userId: row.user_id,
          name: row.name,
          email: row.email,
          org: row.org || "",
          orgWebsite: row.org_website || "",
          invitationCode: row.invitation_code || "",
          accessLevel: row.access_level === "Full Access" ? "Full Access" : "Limited Access",
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
        localProfileStore.set(userId, profile);
        return profile;
      }
    } catch (err) {
      console.warn("D1 query for user profile failed, using local store:", err);
    }
  }

  // 2. In-memory store fallback
  return localProfileStore.get(userId) || null;
}

/**
 * Save or update user profile with invitation code and determine access level
 */
export async function saveUserProfile(
  env: any,
  data: {
    userId: string;
    name: string;
    email: string;
    org?: string;
    orgWebsite?: string;
    invitationCode?: string;
  }
): Promise<UserProfile> {
  const userId = data.userId || "anonymous";
  const name = data.name?.trim() || "Anonymous User";
  const email = data.email?.trim() || "";
  const org = data.org?.trim() || "";
  const orgWebsite = data.orgWebsite?.trim() || "";
  const invitationCode = data.invitationCode?.trim() || "";

  // If user provides a valid invitation/referral code -> Full Access
  // If user does not have any code -> Limited Access
  const hasValidCode = validateInvitationCode(invitationCode);
  const accessLevel: "Full Access" | "Limited Access" = hasValidCode
    ? "Full Access"
    : "Limited Access";

  const now = new Date().toISOString();

  const profile: UserProfile = {
    userId,
    name,
    email,
    org,
    orgWebsite,
    invitationCode,
    accessLevel,
    createdAt: now,
    updatedAt: now,
  };

  // 1. Save to D1 database if available
  if (env?.DB) {
    try {
      await ensureTable(env.DB);
      await env.DB.prepare(
        `INSERT INTO user_profiles (user_id, name, email, org, org_website, invitation_code, access_level, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_id) DO UPDATE SET
           name = excluded.name,
           email = excluded.email,
           org = excluded.org,
           org_website = excluded.org_website,
           invitation_code = excluded.invitation_code,
           access_level = excluded.access_level,
           updated_at = excluded.updated_at;`
      )
        .bind(
          userId,
          name,
          email,
          org,
          orgWebsite,
          invitationCode,
          accessLevel,
          now,
          now
        )
        .run();
    } catch (err) {
      console.warn("D1 save user profile failed, using local store:", err);
    }
  }

  // 2. Cache in-memory
  localProfileStore.set(userId, profile);
  return profile;
}
