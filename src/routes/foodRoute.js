import express from "express";
import {
  addFood,
  getFoods,
  deleteFood,
  updateFood,
} from "../controller/foodController.js";
import { upload } from "../middleware/multerMiddleWare.js";
import {
  addFoodValidation,
  deleteFoodValidation,
  updateFoodValidation,
} from "../middleware/foodValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Add new food item (Admin only)
router.post(
  "/",
  authMiddleware,
  allowRoles(["admin"]),
  upload.single("image"),
  addFoodValidation,
  validate,
  addFood,
);

// Get all food items
router.get("/", authMiddleware, getFoods);

// Delete food item (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  allowRoles(["admin"]),
  deleteFoodValidation,
  validate,
  deleteFood,
);

// Update food item (Admin only)
router.put(
  "/:id",
  authMiddleware,
  allowRoles(["admin"]),
  upload.single("image"),
  updateFoodValidation,
  validate,
  updateFood,
);

export default router;
