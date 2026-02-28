import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  removeUser,
  getAllUsers,
  makeAdmin,
  restoreUser
} from "../controller/userController.js";
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
  removeUserValidation,
  createUserValidation,
  makeAdminValidation,
  restoreUserValidation
} from "../middleware/userValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post(
  "/create-user",
  authMiddleware,
  createUserValidation,
  validate,
  registerUser,
);
router.post("/login", loginValidation, validate, loginUser);
router.put(
  "/:id",
  authMiddleware,
  updateUserValidation,
  validate,
  allowRoles(["admin", "owner"]),
  updateUser,
);
router.delete("/:id", authMiddleware,removeUserValidation,validate, allowRoles(["admin","owner"]),  removeUser);
router.put("/restore/:id", authMiddleware,restoreUserValidation,validate, allowRoles(["admin","owner"]),  restoreUser);

router.get("/all", authMiddleware, getAllUsers);

router.put(
  "/make-admin/:id",
  authMiddleware,
  makeAdminValidation,
  validate,
  allowRoles(["owner","admin"]),
  makeAdmin,
);


export default router;
