import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controller/favoriteController.js";
import {
  addFavoriteValidation,
  removeFavoriteValidation,
} from "../middleware/favoriteValidator.js";
import { validate } from "../middleware/validationResult.js";

const router = express.Router();

// GET /api/favorites
router.get("/", authMiddleware, getFavorites);

// POST /api/favorites (Body: { foodId: "..." })
router.post("/", authMiddleware, addFavoriteValidation, validate, addFavorite);

// DELETE /api/favorites/:foodId
router.delete(
  "/:foodId",
  authMiddleware,
  removeFavoriteValidation,
  validate,
  removeFavorite,
);

export default router;
