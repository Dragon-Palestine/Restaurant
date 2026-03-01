import {
  createRating,
  getRatingsByFoodId,
  deleteRating,
  updateRating,
} from "../services/ratingService.js";

export const addRating = async (req, res, next) => {
  try {
    const ratingData = {
      food: req.params.foodId,
      user: req.user.id,
      rating: req.body.rating,
      review: req.body.review,
    };

    const newRating = await createRating(ratingData);

    res.status(201).json({
      success: true,
      message: "Thank you for your review!",
      data: newRating,
    });
  } catch (error) {
    // Handle unique constraint error (user already reviewed)
    if (error.code === 11000) {
      const customError = new Error(
        "You have already submitted a review for this product.",
      );
      customError.statusCode = 400;
      return next(customError);
    }
    next(error);
  }
};

export const editRating = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const updateData = {};
    if (typeof rating !== "undefined") updateData.rating = rating;
    if (typeof review !== "undefined") updateData.review = review;

    const updatedRating = await updateRating(
      req.params.foodId,
      req.user.id,
      updateData,
    );

    if (!updatedRating) {
      const error = new Error("Rating not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Your review has been updated.",
      data: updatedRating,
    });
  } catch (error) {
    next(error);
  }
};

export const removeRating = async (req, res, next) => {
  try {
    const rating = await deleteRating(req.params.foodId, req.user.id);
    if (!rating) {
      const error = new Error("Rating not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, message: "Rating removed" });
  } catch (error) {
    next(error);
  }
};

export const getFoodRatings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { ratings, total } = await getRatingsByFoodId(
      req.params.foodId,
      page,
      limit,
    );
    res.status(200).json({
      success: true,
      count: ratings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};
