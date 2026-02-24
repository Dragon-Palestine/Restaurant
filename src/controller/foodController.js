import Food from "../models/foodModel.js";
import { unlikeFile } from "../utils/helper.js";

export const addFood = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    if (!req.file) {
      throw new Error("multer dosent work");
    }
    const image = req.file.filename;
    const food = await Food.create({
      name,
      price,
      description,
      image,
      category,
    });
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
    const foods = await Food.find({});
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
    const food = await Food.findById(id);

    unlikeFile(`uploads/${food.image}`);
    await Food.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food removed" });
  } catch (error) {
    next(error);
  }
};
