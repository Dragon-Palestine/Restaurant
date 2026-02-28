import { body, param } from "express-validator";
import { comparePassword } from "../utils/helper.js";
import {
  getActiveUserByEmail,
  getActiveUserById,
  getUserById
} from "../services/userService.js";
export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const existingUser = await getActiveUserByEmail(email);

      if (existingUser) {
        throw new Error("Email already is use");
      }

      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["customer","delivery","admin"]) 
    .withMessage("Role must be 'customer or delivery or admin'"),
];

export const createUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const existingUser = await getActiveUserByEmail(email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .isIn(["customer", "admin", "delivery", "owner"])
    .withMessage("Invalid role"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      const user = await getActiveUserByEmail(email);

      if (!user) {
        throw new Error("Invalid credentials"); // Use a generic message for security
      }
      // Attach user to the request object to avoid a second DB call
      req.user = user;
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      // req.user is available here from the previous validation
      if (!req.user) return false; // Stop if user not found
      const isMatch = await comparePassword(password, req.user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials"); // Use a generic message for security
      }
      return true;
    }),
];

export const updateUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID")
    .custom(async (id, { req }) => {
      const user = await getActiveUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      req.userToUpdate = user;
      return true;
    }),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      if (!req.userToUpdate) return false; // Prevent crash if user not found
      const existingUser = await getActiveUserByEmail(email);
      if (
        existingUser &&
        existingUser._id.toString() !== req.userToUpdate._id.toString()
      ) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("role").optional().isIn(["user", "admin"]),
  body("oldPassword")
    .optional()
    .custom(async (oldPassword, { req }) => {
      if (!req.userToUpdate) return false; // Prevent crash if user not found
      if (!req.body.password) {
        throw new Error("New password is required");
      }
      const isMatch = await comparePassword(
        oldPassword,
        req.userToUpdate.password,
      );
      if (!isMatch) {
        throw new Error("Old password is incorrect");
      }
      return true;
    }),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((password, { req }) => {
      if (!req.body.oldPassword) {
        throw new Error(
          "Old password is required when new password is provided",
        );
      }
      return true;
    }),
];


export const removeUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID")
    .custom(async (id, { req }) => {
      const user = await getActiveUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      req.userToUpdate = user;
      return true;
    }),
];
export const makeAdminValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID")
    .custom(async (id, { req }) => {
      const user = await getActiveUserById(id);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }
      req.userToUpdate = user;
      return true;
    }),
];
export const restoreUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID")
    .custom(async (id, { req }) => {
      const user = await getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      req.userToUpdate = user;
      return true;
    }),
];