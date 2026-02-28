import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Add item to cart
router.post("/", authMiddleware, addToCart);

// Get all items in cart
router.get("/", authMiddleware, getCartItems);

// Remove item from cart
router.delete("/:foodId", authMiddleware, removeFromCart);

export default router;
