import { describe, it, expect, beforeEach } from "vitest";
import { passwordHash } from "@/lib/auth";

const realAuthSecret = process.env.AUTH_SECRET;
process.env.AUTH_SECRET = "test-secret-for-unit-tests";

describe("passwordHash", () => {
  beforeEach(() => {
    process.env.AUTH_SECRET = "test-secret-for-unit-tests";
  });

  it("produces a stable 64-char hex hash for the same input", () => {
    const a = passwordHash("mypassword");
    const b = passwordHash("mypassword");
    expect(a).toBe(b);
    expect(a).toMatch(/^[a-f0-9]{64}$/);
  });

  it("produces different hashes for different passwords", () => {
    expect(passwordHash("pass-one")).not.toBe(passwordHash("pass-two"));
  });

  it("changes when AUTH_SECRET changes", () => {
    const before = passwordHash("x");
    process.env.AUTH_SECRET = "different-secret";
    expect(passwordHash("x")).not.toBe(before);
  });
});