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

router.post(
  "/place",
  authMiddleware,
  placeOrderValidation,
  validate,
  placeOrder,
);
router.post(
  "/verify",
  authMiddleware,
  verifyOrderValidation,
  validate,
  verifyOrder,
);
router.get("/user", authMiddleware, getUserOrders);
router.get("/all", authMiddleware, getAllOrders);
router.put(
  "/status/:orderId",
  authMiddleware,
  getOrderValidation,
  validate,
  updateOrderStatus,
);
router.delete(
  "/:orderId",
  authMiddleware,
  getOrderValidation,
  validate,
  deleteOrder,
);
router.get(
  "/:orderId",
  authMiddleware,
  getOrderValidation,
  validate,
  getSingleOrder,
);

export default router;
