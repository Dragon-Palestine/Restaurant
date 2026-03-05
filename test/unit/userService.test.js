import sinon from "sinon";
import { expect } from "chai";
import User from "../../src/models/userModel.js";
import { createUser } from "../../src/services/userService.js";
import { newUserPayload, mockUserDoc } from "../mocks/userData.js";

describe("User Service", () => {
  afterEach(() => {
    // Restore the default sandbox
    sinon.restore();
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      // Use a subset of the payload for this service test
      const userData = { ...newUserPayload, password: "hashedpassword" };

      // Stub the User.create method
      const createStub = sinon.stub(User, "create").resolves(mockUserDoc);

      const user = await createUser(userData);

      // Assertions
      expect(createStub.calledOnceWith(userData)).to.be.true;
      expect(user).to.deep.equal(mockUserDoc);
    });

    it("should throw an error if user creation fails", async () => {
      const userData = { ...newUserPayload, password: "hashedpassword" };
      const error = new Error("Database error");

      // Stub the User.create method to reject
      sinon.stub(User, "create").rejects(error);

      try {
        await createUser(userData);
        expect.fail("createUser should have thrown an error");
      } catch (e) {
        expect(e).to.equal(error);
      }
    });
  });
});
