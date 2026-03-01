import {
  addFavoriteToUser,
  removeFavoriteFromUser,
  getUserFavorites,
} from "../services/favoriteService.js";

export const addFavorite = async (req, res, next) => {
  try {
    const { foodId } = req.body;
    const favorites = await addFavoriteToUser(req.user.id, foodId);
    res.status(200).json({
      success: true,
      message: "Food added to favorites",
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const favorites = await removeFavoriteFromUser(req.user.id, foodId);
    res.status(200).json({
      success: true,
      message: "Food removed from favorites",
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await getUserFavorites(req.user.id);
    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};
