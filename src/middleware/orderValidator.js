import { body, param } from "express-validator";
import { validId } from "../utils/helper.js";
import Order from "../models/orderModel.js";

export const placeOrderValidation = [
  body("items")
    .notEmpty()
    .isArray()
    .withMessage("Items must be a non-empty array"),
  body("amount")
    .notEmpty()
    .isNumeric()
    .withMessage("Amount is required and must be a number"),
  body("address")
    .notEmpty()
    .isObject()
    .withMessage("Address is required and must be an object"),
];

export const verifyOrderValidation = [
  body("orderId").notEmpty().withMessage("Order ID is required"),
  body("success")
    .notEmpty()
    .isBoolean()
    .withMessage("Success is required and must be a boolean"),
];

export const getOrderValidation = [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .custom(async (id) => {
      if (!validId(id)) {
        throw new Error("Invalid Order ID");
      }
      const order = await Order.findById(id);
      if (!order) {
        throw new Error("Order not found");
      }
    }),
];
