import { describe, it, expect, beforeEach } from "vitest";
import {
  hashApiKey,
  generateRawKey,
  createApiKey,
  validateApiKey,
  listApiKeys,
  revokeApiKey,
} from "./keys";

describe("API Key Authentication & Metering", () => {
  const mockEnv: any = {};

  it("should generate formatted raw keys", () => {
    const liveKey = generateRawKey(false);
    expect(liveKey.startsWith("spg_live_")).toBe(true);
    expect(liveKey.length).toBe(9 + 48); // prefix + hex

    const testKey = generateRawKey(true);
    expect(testKey.startsWith("spg_test_")).toBe(true);
  });

  it("should hash keys deterministically using SHA-256", async () => {
    const key = "spg_live_test1234567890abcdef";
    const hash1 = await hashApiKey(key);
    const hash2 = await hashApiKey(key);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64); // 256 bits = 64 hex chars
  });

  it("should create, list, validate, and meter API keys", async () => {
    const { rawKey, record } = await createApiKey("Production Backend", "pro", 5, mockEnv);
    expect(rawKey.startsWith("spg_live_")).toBe(true);
    expect(record.name).toBe("Production Backend");
    expect(record.monthly_quota).toBe(5);
    expect(record.requests_used).toBe(0);

    // Validate key
    const val1 = await validateApiKey(rawKey, mockEnv);
    expect(val1.valid).toBe(true);
    expect(val1.record?.requests_used).toBe(1);

    // Verify key appears in list
    const list = await listApiKeys(mockEnv);
    expect(list.some((k) => k.id === record.id)).toBe(true);

    // Exhaust quota
    await validateApiKey(rawKey, mockEnv); // 2
    await validateApiKey(rawKey, mockEnv); // 3
    await validateApiKey(rawKey, mockEnv); // 4
    await validateApiKey(rawKey, mockEnv); // 5

    // Next request should fail with 429 quota exceeded
    const valExhausted = await validateApiKey(rawKey, mockEnv);
    expect(valExhausted.valid).toBe(false);
    expect(valExhausted.statusCode).toBe(429);
    expect(valExhausted.error).toContain("Monthly request quota exceeded");
  });

  it("should reject revoked or invalid API keys", async () => {
    const { rawKey, record } = await createApiKey("Revoke Test", "free", 100, mockEnv);

    // Revoke
    await revokeApiKey(record.id, mockEnv);

    const val = await validateApiKey(rawKey, mockEnv);
    expect(val.valid).toBe(false);
    expect(val.statusCode).toBe(401);

    // Random non-existent key
    const valRandom = await validateApiKey("spg_live_nonexistent0000000000", mockEnv);
    expect(valRandom.valid).toBe(false);
    expect(valRandom.statusCode).toBe(401);
  });
});
