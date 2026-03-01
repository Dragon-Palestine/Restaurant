import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  addDeliveryRating,
  getDeliveryRatings,
  editDeliveryRating,
  removeDeliveryRating,
} from "../controller/deliveryRatingController.js";
import {
  addDeliveryRatingValidation,
  updateDeliveryRatingValidation,
} from "../middleware/deliveryRatingValidator.js";
import { validate } from "../middleware/validationResult.js";

const router = express.Router({ mergeParams: true });

// Corresponds to:
// POST /api/users/:id/ratings
// GET  /api/users/:id/ratings
// DELETE /api/users/:id/ratings
// PUT /api/users/:id/ratings
router
  .route("/")
  .post(
    authMiddleware,
    addDeliveryRatingValidation,
    validate,
    addDeliveryRating,
  )
  .get(getDeliveryRatings)
  .delete(authMiddleware, removeDeliveryRating)
  .put(
    authMiddleware,
    updateDeliveryRatingValidation,
    validate,
    editDeliveryRating,
  );

export default router;
