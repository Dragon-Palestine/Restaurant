import express from "express";
import { registerUser, loginUser, updateUser,removeUser,getAllUsers} from "../controller/userController.js";
import { registerValidation,loginValidation,updateUserValidation,removeUserValidation } from "../middleware/userValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login",loginValidation,validate, loginUser);
router.put("/:userId",authMiddleware,updateUserValidation,validate, updateUser);
router.delete('/:userId',authMiddleware,removeUserValidation,removeUser);
router.get('/all',authMiddleware,getAllUsers);
export default router;