import { describe, it, expect } from "vitest";
import {
  getUserProfile,
  saveUserProfile,
  validateInvitationCode,
} from "./profile";

describe("User Profile & Invitation Access Module", () => {
  it("should validate invitation codes correctly", () => {
    expect(validateInvitationCode("")).toBe(false);
    expect(validateInvitationCode(undefined)).toBe(false);
    expect(validateInvitationCode("12")).toBe(false);
    expect(validateInvitationCode("SPG-INVITE-2026")).toBe(true);
    expect(validateInvitationCode("VIP")).toBe(true);
  });

  it("should tag user with Limited Access if no invitation code is provided", async () => {
    const profile = await saveUserProfile({}, {
      userId: "user_test_no_code",
      name: "John Doe",
      email: "john@example.com",
      org: "Acme Corp",
      orgWebsite: "https://acme.com",
      invitationCode: "",
    });

    expect(profile.accessLevel).toBe("Limited Access");
    expect(profile.name).toBe("John Doe");
    expect(profile.org).toBe("Acme Corp");
    expect(profile.invitationCode).toBe("");

    const fetched = await getUserProfile({}, "user_test_no_code");
    expect(fetched).not.toBeNull();
    expect(fetched?.accessLevel).toBe("Limited Access");
  });

  it("should tag user with Full Access if a valid invitation code is provided", async () => {
    const profile = await saveUserProfile({}, {
      userId: "user_test_with_code",
      name: "Alice Smith",
      email: "alice@partner.org",
      org: "Partner Org",
      orgWebsite: "https://partner.org",
      invitationCode: "SPG-BETA-ACCESS",
    });

    expect(profile.accessLevel).toBe("Full Access");
    expect(profile.invitationCode).toBe("SPG-BETA-ACCESS");

    const fetched = await getUserProfile({}, "user_test_with_code");
    expect(fetched).not.toBeNull();
    expect(fetched?.accessLevel).toBe("Full Access");
  });

  it("should allow upgrading from Limited Access to Full Access by submitting a code later", async () => {
    await saveUserProfile({}, {
      userId: "user_upgrade_test",
      name: "Bob Builder",
      email: "bob@builder.com",
      invitationCode: "",
    });

    let fetched = await getUserProfile({}, "user_upgrade_test");
    expect(fetched?.accessLevel).toBe("Limited Access");

    await saveUserProfile({}, {
      userId: "user_upgrade_test",
      name: "Bob Builder",
      email: "bob@builder.com",
      org: "Builder Inc",
      invitationCode: "INVITE_VIP_KEY",
    });

    fetched = await getUserProfile({}, "user_upgrade_test");
    expect(fetched?.accessLevel).toBe("Full Access");
    expect(fetched?.org).toBe("Builder Inc");
  });

  it("should recognize boruahpriyanuj2004@gmail.com as admin and grant Full Access automatically", async () => {
    const adminProfile = await saveUserProfile({}, {
      userId: "admin_test_uid",
      name: "Priyanuj Boruah",
      email: "boruahpriyanuj2004@gmail.com",
      invitationCode: "", // No code provided!
    });

    expect(adminProfile.accessLevel).toBe("Full Access");

    const fetched = await getUserProfile({}, "admin_test_uid");
    expect(fetched?.accessLevel).toBe("Full Access");
  });

  it("should create, list, redeem, exhaust, and revoke invitation codes", async () => {
    const { createInvitationCode, listInvitationCodes, revokeInvitationCode } = await import("./profile");

    // 1. Create a single-use code
    const singleCode = await createInvitationCode({}, {
      code: "SPG-TEST-SINGLE",
      description: "Partner Alpha",
      maxUses: 1,
      createdBy: "boruahpriyanuj2004@gmail.com",
    });
    expect(singleCode.code).toBe("SPG-TEST-SINGLE");
    expect(singleCode.maxUses).toBe(1);
    expect(singleCode.usesCount).toBe(0);

    // 2. First redemption should succeed
    const user1 = await saveUserProfile({}, {
      userId: "usr_partner_1",
      name: "Partner One",
      email: "one@partner.com",
      invitationCode: "SPG-TEST-SINGLE",
    });
    expect(user1.accessLevel).toBe("Full Access");

    // 3. Second redemption of single-use code should fail (exhausted) and tag as Limited Access
    const user2 = await saveUserProfile({}, {
      userId: "usr_partner_2",
      name: "Partner Two",
      email: "two@partner.com",
      invitationCode: "SPG-TEST-SINGLE",
    });
    expect(user2.accessLevel).toBe("Limited Access");

    // 4. Revocation should prevent any redemptions
    await createInvitationCode({}, {
      code: "SPG-REVOKE-ME",
      maxUses: 10,
    });
    await revokeInvitationCode({}, "SPG-REVOKE-ME");

    const user3 = await saveUserProfile({}, {
      userId: "usr_partner_3",
      name: "Partner Three",
      email: "three@partner.com",
      invitationCode: "SPG-REVOKE-ME",
    });
    expect(user3.accessLevel).toBe("Limited Access");

    // 5. List codes includes created codes
    const codes = await listInvitationCodes({});
    expect(codes.some((c) => c.code === "SPG-TEST-SINGLE")).toBe(true);
    expect(codes.some((c) => c.code === "SPG-REVOKE-ME")).toBe(true);
  });
});
