import { body, param } from "express-validator";
import { getActiveUserById } from "../services/userService.js";

export const addDeliveryRatingValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid User ID")
    .custom(async (id, { req }) => {
      const user = await getActiveUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.role !== "delivery") {
        throw new Error("User is not a delivery person");
      }
      if(id===req.user.id){
        throw new Error("You cannot rate yourself");
      }
      return true;
    }),
  body("rating")
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  body("review").optional().trim(),
];

export const updateDeliveryRatingValidation = [
  param("id").isMongoId().withMessage("Invalid User ID"),
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
