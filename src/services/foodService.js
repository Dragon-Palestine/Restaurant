import Food from "../models/foodModel.js";
import { paginate } from "../utils/pagination.js";

export const createFood = async (foodData) => {
  try {
    const food = await Food.create(foodData);
    return food;
  } catch (error) {
    throw error;
  }
};
export const getAllFoods = async (page = 1, limit = 10) => {
  try {
    const result = await paginate(Food, {}, page, limit);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteFoodById = async (id) => {
  try {
    const food = await Food.findByIdAndDelete(id);
    return food;
  } catch (error) {
    throw error;
  }
};

export const getFoodById = async (id) => {
  try {
    const food = await Food.findById(id);
    return food;
  } catch (error) {
    throw error;
  }
};

export const updateFoodById = async (id, updateData) => {
  try {
    const food = await Food.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    return food;
  } catch (error) {
    throw error;
  }
};
