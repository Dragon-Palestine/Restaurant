import { unlikeFile } from "../utils/helper.js";
import {
  createFood,
  getAllFoods,
  deleteFoodById,
  getFoodById,
  updateFoodById,
} from "../services/foodService.js";
import { foodResponse } from "../utils/responseFormatters.js";

export const addFood = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    if (!req.file) {
      const error = new Error("Image is required");
      error.statusCode = 400;
      throw error;
    }
    const image = req.file.filename;
    const foodData = {
      name,
      price,
      description,
      image,
      category,
    };
    const food = await createFood(foodData);

    const io = req.app.get("io");
    io.emit("foodAdded", food);

    res
      .status(201)
      .json({
        success: true,
        data: foodResponse(food),
        message: "Food added successfully",
      });
  } catch (error) {
    if (req.file) {
      unlikeFile(`uploads/${req.file.filename}`);
    }
    next(error);
  }
};

export const getFoods = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { search, category } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;

    const result = await getAllFoods(page, limit, query);
    res.status(200).json({
      success: true,
      ...result,
      data: result.data.map(foodResponse),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await getFoodById(id);
    unlikeFile(`uploads/${food.image}`);
    await deleteFoodById(id);

    const io = req.app.get("io");
    io.emit("foodDeleted", id);

    res.status(200).json({ success: true, message: "Food removed" });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const foodData = {
      name,
      price,
      description,
      category,
    };
    const newFood = await updateFoodById(id, foodData);

    const io = req.app.get("io");
    io.emit("foodUpdated", newFood);

    res.status(200).json({
      success: true,
      data: foodResponse(newFood),
      message: "Food updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
