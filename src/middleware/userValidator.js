import { body } from "express-validator";
import User from "../models/userModel.js";
import { comparePassword } from "../utils/helper.js";

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });

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
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

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
