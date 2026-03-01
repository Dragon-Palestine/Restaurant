import { body, param } from "express-validator";
import { getFoodById } from "../services/foodService.js";

export const addRatingValidation = [
  param("foodId")
    .isMongoId()
    .withMessage("Invalid Food ID")
    .custom(async (id) => {
      const food = await getFoodById(id);
      if (!food) {
        throw new Error("Food not found");
      }
      return true;
    }),
  body("rating")
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  body("review").optional().trim(),
];

export const updateRatingValidation = [
  param("foodId").isMongoId().withMessage("Invalid Food ID"),
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  body("review").optional().trim(),
  body().custom((value, { req }) => {
    if (
      typeof req.body.rating === "undefined" &&
      typeof req.body.review === "undefined"
    ) {
      throw new Error(
        "At least one field (rating or review) must be provided for update.",
      );
    }
    return true;
  }),
];
