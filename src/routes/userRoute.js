import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  removeUser,
  getAllUsers,
  makeAdmin,
  restoreUser,
} from "../controller/userController.js";
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
  removeUserValidation,
  createUserValidation,
  makeAdminValidation,
  restoreUserValidation,
} from "../middleware/userValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Register a new customer (public)
router.post("/register", registerValidation, validate, registerUser);

// Create a new user with specific role (admin only)
router.post("/", authMiddleware, createUserValidation, validate, registerUser);

// Login user
router.post("/login", loginValidation, validate, loginUser);

// Get all users (admin only)
router.get("/", authMiddleware, getAllUsers);

// Update user details
router.put(
  "/:id",
  authMiddleware,
  updateUserValidation,
  validate,
  allowRoles(["admin", "owner"]),
  updateUser,
);

// Soft delete user
router.delete(
  "/:id",
  authMiddleware,
  removeUserValidation,
  validate,
  allowRoles(["admin", "owner"]),
  removeUser,
);

// Restore soft-deleted user
router.patch(
  "/:id/restore",
  authMiddleware,
  restoreUserValidation,
  validate,
  allowRoles(["admin", "owner"]),
  restoreUser,
);

// Promote user to admin
router.patch(
  "/:id/admin",
  authMiddleware,
  makeAdminValidation,
  validate,
  allowRoles(["owner", "admin"]),
  makeAdmin,
);

export default router;
