import request from "supertest";
import sinon from "sinon";
import { expect } from "chai";
import app from "../../src/app.js"; // Assuming app.js exports the express app
import User from "../../src/models/userModel.js";
import bcrypt from "bcryptjs";
import {
  newUserPayload,
  mockUserDoc,
  invalidUserPayload,
} from "../mocks/userData.js";

describe("User Routes - POST /api/users/register", () => {
  let createStub;
  let hashStub;
  let findOneStub;

  beforeEach(() => {
    // Stub the underlying dependencies (Mongoose Model and bcrypt)
    // instead of trying to stub ES Module exports from service files.
    hashStub = sinon.stub(bcrypt, "hash").resolves("hashed_password");
    createStub = sinon.stub(User, "create");
    findOneStub = sinon.stub(User, "findOne");
  });

  afterEach(() => {
    // Restore stubs after each test
    sinon.restore();
  });

  it("should register a new user successfully and return 201", async () => {
    // Stub findOne to return null (user does not exist - for validator)
    findOneStub.resolves(null);
    // Stub create to return the new user
    createStub.resolves(mockUserDoc);

    const res = await request(app)
      .post("/api/users/register")
      .send(newUserPayload);

    expect(res.status).to.equal(201);
    expect(res.body.success).to.be.true;
    expect(res.body.message).to.equal("User registered successfully");
    expect(res.body.data).to.have.property("id", mockUserDoc._id);
    expect(hashStub.called).to.be.true;
    expect(createStub.called).to.be.true;
  });

  it("should return 400 if validation fails (e.g., missing name)", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(invalidUserPayload);

    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
    expect(res.body.errors).to.be.an("array");
    expect(res.body.errors[0].msg).to.equal("Name is required");
  });

  it("should handle errors during user creation and return 500", async () => {
    const dbError = new Error("Database connection failed");

    // User does not exist (validation passes)
    findOneStub.resolves(null);
    // Database fails on create
    createStub.rejects(dbError);

    const res = await request(app)
      .post("/api/users/register")
      .send(newUserPayload);

    expect(res.status).to.equal(500);
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal("Database connection failed");
  });
});
