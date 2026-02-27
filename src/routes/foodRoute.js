import express from "express";
import { addFood, getFoods, deleteFood,updateFood } from "../controller/foodController.js";
import { upload } from "../middleware/multerMiddleWare.js";
import {
  addFoodValidation,
  deleteFoodValidation,
  updateFoodValidation
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
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  updateFoodValidation,
  validate,
  updateFood
);


export default router;
