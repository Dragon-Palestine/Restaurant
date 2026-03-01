import Rating from "../models/ratingModel.js";

export const createRating = async (ratingData) => {
  try {
    // The unique index on the model will prevent duplicates
    const rating = await Rating.create(ratingData);
    return rating;
  } catch (error) {
    throw error;
  }
};

export const getRatingsByFoodId = async (foodId) => {
  try {
    const ratings = await Rating.find({ food: foodId }).populate(
      "user",
      "name",
    ).populate("food", "name");
    return ratings;
  } catch (error) {
    throw error;
  }
};

export const deleteRating = async (foodId, userId) => {
  try {
    const rating = await Rating.findOneAndDelete({
      food: foodId,
      user: userId,
    });
    return rating;
  } catch (error) {
    throw error;
  }
};

export const updateRating = async (foodId, userId, updateData) => {
  try {
    const rating = await Rating.findOneAndUpdate(
      { food: foodId, user: userId },
      updateData,
      { new: true, runValidators: true },
    );
    return rating;
  } catch (error) {
    throw error;
  }
};
