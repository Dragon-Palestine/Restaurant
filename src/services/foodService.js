import Food from "../models/foodModel.js";
export const createFood = async (foodData) => {
    try {
        const food = await Food.create(foodData);
        return food;
    } catch (error) {
        throw error;
    }
}
export const getAllFoods = async () => {
    try {
        const foods = await Food.find({});
        return foods;
    } catch (error) {
        throw error;
    }
}

export const deleteFoodById = async (id) => {
    try {
        const food = await Food.findByIdAndDelete(id);
        return food;
    } catch (error) {
        throw error;
    }
}

export const getFoodById = async (id)=>{
    try {
        const food = await Food.findById(id);
        return food;
    } catch (error) {
        throw error;
    }
}

export const updateFoodById = async (id,updateData)=>{
    try {
        const food = await Food.findByIdAndUpdate(id,updateData,{returnDocument:"after"});
        return food;
    } catch (error) {
        throw error;
    }
}