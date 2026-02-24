import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";
import { registerValidation,loginValidation } from "../middleware/userValidator.js";
import { validate } from "../middleware/validationResult.js";
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login",loginValidation,validate, loginUser);
export default router;