import { unlikeFile } from "../utils/helper.js";
import { createFood,getAllFoods,deleteFoodById,getFoodById,updateFoodById } from "../services/foodService.js";

export const addFood = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    if (!req.file) {
      throw new Error("multer dosent work");
    }
    const image = req.file.filename;
    const foodData={
      name,
      price,
      description,
      image,
      category,
    }
    const food = await createFood(foodData);
    res
      .status(201)
      .json({ success: true, data: food, message: "Food added successfully" });
  } catch (error) {
    if (req.file) {
      unlikeFile(`uploads/${req.file.filename}`);
    }
    next(error);
  }
};

export const getFoods = async (req, res, next) => {
  try {
    const foods = await getAllFoods();
    res.status(200).json({
      success: true,
      data: foods,
      message: "Foods fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.body;
    const food = await getFoodById(id);
    unlikeFile(`uploads/${food.image}`);
    await deleteFoodById(id);
    res.status(200).json({ success: true, message: "Food removed" });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const foodData={
      name,
      price,
      description,
      category,
    }
    const newFood=await updateFoodById(id,foodData);

    res.status(200).json({ success: true, data: newFood, message: "Food updated successfully" });
  } catch (error) {
    next(error);
  }
}