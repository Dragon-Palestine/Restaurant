import DeliveryRating from "../models/deliveryRatingModel.js";

export const createDeliveryRating = async (ratingData) => {
  try {
    const rating = await DeliveryRating.create(ratingData);
    return rating;
  } catch (error) {
    throw error;
  }
};

export const getRatingsByDeliveryPersonId = async (deliveryPersonId) => {
  try {
    const ratings = await DeliveryRating.find({
      deliveryPerson: deliveryPersonId,
    }).populate("user", "name").populate("deliveryPerson", "name");
    return ratings;
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
