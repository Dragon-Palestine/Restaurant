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
      // The service expects a hashed password, so we create a specific payload for it.
      const userData = {
        ...newUserPayload,
        password: "hashed_password_from_controller",
      };

      // Stub the User.create method
      const createStub = sinon.stub(User, "create").resolves(mockUserDoc);

      const user = await createUser(userData);

      // Assertions
      expect(createStub.calledOnceWith(userData)).to.be.true;
      expect(user).to.deep.equal(mockUserDoc);
    });

    it("should throw an error if user creation fails", async () => {
      const userData = {
        ...newUserPayload,
        password: "hashed_password_from_controller",
      };
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
