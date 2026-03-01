import DeliveryRating from "../models/deliveryRatingModel.js";
import { paginate } from "../utils/pagination.js";

export const createDeliveryRating = async (ratingData) => {
  try {
    const rating = await DeliveryRating.create(ratingData);
    return rating;
  } catch (error) {
    throw error;
  }
};

export const getRatingsByDeliveryPersonId = async (
  deliveryPersonId,
  page = 1,
  limit = 10,
) => {
  try {
    const result = await paginate(
      DeliveryRating,
      { deliveryPerson: deliveryPersonId },
      page,
      limit,
      [
        { path: "user", select: "name" },
        { path: "deliveryPerson", select: "name" },
      ],
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteDeliveryRating = async (deliveryPersonId, userId) => {
  try {
    const rating = await DeliveryRating.findOneAndDelete({
      deliveryPerson: deliveryPersonId,
      user: userId,
    });
    return rating;
  } catch (error) {
    throw error;
  }
};

export const updateDeliveryRating = async (
  deliveryPersonId,
  userId,
  updateData,
) => {
  try {
    const rating = await DeliveryRating.findOneAndUpdate(
      { deliveryPerson: deliveryPersonId, user: userId },
      updateData,
      { new: true, runValidators: true },
    );
    return rating;
  } catch (error) {
    throw error;
  }
};
