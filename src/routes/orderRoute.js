import express from "express";
import {
  placeOrder,
  verifyOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getSingleOrder,
} from "../controller/orderController.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  placeOrderValidation,
  verifyOrderValidation,
  getOrderValidation,
} from "../middleware/orderValidator.js";
import { validate } from "../middleware/validationResult.js";
const router = express.Router();

// Place a new order
router.post("/", authMiddleware, placeOrderValidation, validate, placeOrder);

// Verify payment (Stripe callback)
router.post(
  "/verify",
  authMiddleware,
  verifyOrderValidation,
  validate,
  verifyOrder,
);

// Get logged-in user's orders
router.get("/my-orders", authMiddleware, getUserOrders);

// Get all orders (Admin only)
router.get("/", authMiddleware, getAllOrders);

// Update order status (Admin only)
router.patch(
  "/:orderId/status",
  authMiddleware,
  getOrderValidation,
  validate,
  updateOrderStatus,
);

// Delete an order (Admin only)
router.delete(
  "/:orderId",
  authMiddleware,
  getOrderValidation,
  validate,
  deleteOrder,
);

// Get single order details
router.get(
  "/:orderId",
  authMiddleware,
  getOrderValidation,
  validate,
  getSingleOrder,
);

export default router;
