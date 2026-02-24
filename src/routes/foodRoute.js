import express from "express";
import { addFood, getFoods, deleteFood } from "../controller/foodController.js";
import { upload } from "../middleware/multerMiddleWare.js";
import {
  addFoodValidation,
  deleteFoodValidation,
} from "../middleware/foodValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  addFoodValidation,
  validate,
  addFood,
);
router.get("/list", authMiddleware, getFoods);
router.delete(
  "/delete",
  authMiddleware,
  isAdmin,
  deleteFoodValidation,
  validate,
  deleteFood,
);

export default router;
