import express from "express";
import { addFood, getFoods, deleteFood,updateFood } from "../controller/foodController.js";
import { upload } from "../middleware/multerMiddleWare.js";
import {
  addFoodValidation,
  deleteFoodValidation,
  updateFoodValidation
} from "../middleware/foodValidator.js";
import { validate } from "../middleware/validationResult.js";
import { authMiddleware } from "../middleware/auth.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  allowRoles(["admin"]),
  upload.single("image"),
  addFoodValidation,
  validate,
  addFood,
);
router.get("/list", authMiddleware, getFoods);
router.delete(
  "/delete",
  authMiddleware,
  allowRoles(["admin"]),
  deleteFoodValidation,
  validate,
  deleteFood,
);
router.put(
  "/:id",
  authMiddleware,
  allowRoles(["admin"]),
  upload.single("image"),
  updateFoodValidation,
  validate,
  updateFood
);


export default router;
