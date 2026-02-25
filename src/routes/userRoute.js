import express from "express";
import { registerUser, loginUser, updateUser} from "../controller/userController.js";
import { registerValidation,loginValidation,updateUserValidation } from "../middleware/userValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login",loginValidation,validate, loginUser);
router.put("/update/:id",authMiddleware,updateUserValidation,validate, updateUser);
export default router;