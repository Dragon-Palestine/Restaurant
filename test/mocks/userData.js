// A central place for reusable mock data for tests

/**
 * A base user object for registration or creation payloads.
 * Represents the data sent from the client.
 */
export const newUserPayload = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  role: "customer",
};

/**
 * A mock user object that simulates a Mongoose document returned from the DB.
 * Includes properties like _id and a toObject method.
 */
export const mockUserDoc = {
  _id: "mockUserId",
  name: "Test User",
  email: "test@example.com",
  password: "hashed_password",
  role: "customer",
  // Simulate Mongoose's toObject method for clean data extraction in responses
  toObject: () => ({
    id: "mockUserId",
    name: "Test User",
    email: "test@example.com",
    role: "customer",
  }),
};

/**
 * Login credentials derived from the new user payload.
 */
export const loginCredentials = {
  email: newUserPayload.email,
  password: newUserPayload.password,
};

/**
 * An invalid payload for testing validation (e.g., missing name).
 */
export const invalidUserPayload = {
  email: "test@example.com",
  password: "password123",
};

/**
 * Credentials with a wrong password for testing login failure.
 */
export const wrongPasswordCredentials = {
  email: newUserPayload.email,
  password: "wrongpassword",
};

/**
 * A simple mock user object for internal checks (like in login tests where full mongoose doc isn't strictly needed for the stub return value in some cases, though mockUserDoc is usually preferred).
 */
export const mockUserWithHashedPassword = {
  _id: "mockUserId",
  email: "test@example.com",
  password: "hashed_password",
};
