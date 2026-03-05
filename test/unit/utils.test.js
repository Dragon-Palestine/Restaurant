import { expect } from "chai";
import { hashPassword, comparePassword } from "../../src/utils/helper.js";

describe("Utils - Password Hashing", () => {
  before(() => {
    // Set a dummy salt rounds for testing
    process.env.SALT_ROUNDS = "10";
  });

  it("should hash a password", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).to.be.a("string");
    expect(hashedPassword).to.not.equal(password);
  });

  it("should compare a correct password and return true", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).to.be.true;
  });

  it("should compare an incorrect password and return false", async () => {
    const password = "password123";
    const wrongPassword = "wrongpassword";
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword(wrongPassword, hashedPassword);
    expect(isMatch).to.be.false;
  });
});
