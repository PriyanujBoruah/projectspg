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
});
