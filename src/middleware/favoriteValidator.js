import { body, param } from "express-validator";
import { getFoodById } from "../services/foodService.js";

export const addFavoriteValidation = [
  body("foodId")
    .isMongoId()
    .withMessage("Invalid Food ID")
    .custom(async (id) => {
      const food = await getFoodById(id);
      if (!food) {
        throw new Error("Food not found");
      }
      return true;
    }),
];

export const removeFavoriteValidation = [
  param("foodId").isMongoId().withMessage("Invalid Food ID"),
];
