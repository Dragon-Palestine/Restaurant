import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Add item to cart (POST /api/cart)
router.post("/", authMiddleware, addToCart);

// Get current user's cart items (GET /api/cart)
router.get("/", authMiddleware, getCartItems);

// Remove specific item from cart (DELETE /api/cart/:foodId)
router.delete("/:foodId", authMiddleware, removeFromCart);

export default router;
