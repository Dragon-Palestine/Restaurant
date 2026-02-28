import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controller/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/items", authMiddleware, getCartItems);
router.delete("/delete/:id", authMiddleware, removeFromCart);

export default router;
