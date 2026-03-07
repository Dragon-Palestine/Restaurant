import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  addRating,
  getFoodRatings,
  editRating,
  removeRating,
} from "../controller/foodRatingController.js";
import {
  addRatingValidation,
  updateRatingValidation,
} from "../middleware/foodRatingValidator.js";
import { validate } from "../middleware/validationResult.js";

const router = express.Router({ mergeParams: true });

// Corresponds to:
// POST /api/foods/:foodId/ratings
// GET  /api/foods/:foodId/ratings
// DELETE /api/foods/:foodId/ratings
// PUT /api/foods/:foodId/ratings
router
  .route("/")
  .post(authMiddleware, addRatingValidation, validate, addRating)
  .get(getFoodRatings)
  .delete(authMiddleware, removeRating)
  .put(authMiddleware, updateRatingValidation, validate, editRating);

export default router;
