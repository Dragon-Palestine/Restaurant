import { body } from "express-validator";
import { validId } from "../utils/helper.js";
import { getFoodById } from "../services/foodService.js";

export const addFoodValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];

export const deleteFoodValidation = [
  body("id")
    .trim()
    .notEmpty()
    .withMessage("Food ID is required")
    .custom(async (id) => {
      if (!validId(id)) {
        throw new Error("Invalid food ID");
      }
      const exitedFood = await getFoodById(id);
      if (!exitedFood) {
        return Promise.reject("Food not found");
      }
      return true;
    }),
];

export const updateFoodValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];
