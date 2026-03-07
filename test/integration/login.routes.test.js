import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import app from "../../src/app.js";
import User from "../../src/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginCredentials,
  mockUserDoc,
  newUserPayload,
  wrongPasswordCredentials,
  mockUserWithHashedPassword,
} from "../mocks/userData.js";

describe("User Routes - POST /api/users/login", () => {
  let findOneStub;
  let compareStub;

  beforeEach(() => {
    // Stub the Mongoose User model and bcrypt
    findOneStub = sinon.stub(User, "findOne");
    compareStub = sinon.stub(bcrypt, "compare");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should login a user successfully and return a token", async () => {
    // The validator will call findOne to check if the user exists
    findOneStub.resolves(mockUserDoc);
    // The validator will then call compare to check the password
    compareStub.resolves(true);

    const res = await request(app)
      .post("/api/users/login")
      .send(loginCredentials);

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    expect(res.body.message).to.equal("User logged in successfully");
    expect(res.body).to.have.property("token");
    expect(res.body.data).to.have.property("id", "mockUserId");

    // Verify the token contains the correct payload
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded.id).to.equal(mockUserDoc._id);
    expect(decoded.email).to.equal(mockUserDoc.email);
  });

  it("should return 400 for invalid credentials (wrong password)", async () => {
    findOneStub.resolves(mockUserWithHashedPassword); // User is found
    compareStub.resolves(false); // But password does not match

    const res = await request(app)
      .post("/api/users/login")
      .send(wrongPasswordCredentials);

    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
    expect(res.body.errors[0].msg).to.equal("Invalid credentials");
  });

  it("should return 400 for invalid credentials (user not found)", async () => {
    findOneStub.resolves(null); // User is not found
    const res = await request(app).post("/api/users/login").send({
      email: "nonexistent@user.com",
      password: "anypassword",
    });
    expect(res.status).to.equal(400);
    expect(res.body.errors[0].msg).to.equal("Invalid credentials");
  });
});
