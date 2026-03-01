import {
  createDeliveryRating,
  getRatingsByDeliveryPersonId,
  deleteDeliveryRating,
  updateDeliveryRating,
} from "../services/deliveryRatingService.js";

export const addDeliveryRating = async (req, res, next) => {
  try {
    const ratingData = {
      deliveryPerson: req.params.id, // Comes from the route param :id
      user: req.user.id,
      rating: req.body.rating,
      review: req.body.review,
    };

    const newRating = await createDeliveryRating(ratingData);

    res.status(201).json({
      success: true,
      message: "Thank you for rating the delivery service!",
      data: newRating,
    });
  } catch (error) {
    if (error.code === 11000) {
      const customError = new Error(
        "You have already submitted a review for this delivery person.",
      );
      customError.statusCode = 400;
      return next(customError);
    }
    next(error);
  }
};

export const editDeliveryRating = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const updateData = {};
    if (typeof rating !== "undefined") updateData.rating = rating;
    if (typeof review !== "undefined") updateData.review = review;

    const updatedRating = await updateDeliveryRating(
      req.params.id,
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
      message: "Your delivery review has been updated.",
      data: updatedRating,
    });
  } catch (error) {
    next(error);
  }
};

export const removeDeliveryRating = async (req, res, next) => {
  try {
    // req.params.id refers to the delivery person ID from the route
    const rating = await deleteDeliveryRating(req.params.id, req.user.id);
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

export const getDeliveryRatings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { ratings, total } = await getRatingsByDeliveryPersonId(
      req.params.id,
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
