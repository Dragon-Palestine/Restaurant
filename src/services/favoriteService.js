import User from "../models/userModel.js";

export const addFavoriteToUser = async (userId, foodId) => {
  try {
    // $addToSet adds the value only if it doesn't already exist
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: foodId } },
      { new: true },
    ).populate("favorites");
    return user.favorites;
  } catch (error) {
    throw error;
  }
};

export const removeFavoriteFromUser = async (userId, foodId) => {
  try {
    // $pull removes the value from the array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: foodId } },
      { new: true },
    ).populate("favorites");
    return user.favorites;
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const user = await User.findById(userId).populate("favorites");
    return user ? user.favorites : [];
  } catch (error) {
    throw error;
  }
};
