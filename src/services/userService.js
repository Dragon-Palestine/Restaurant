import User from "../models/userModel.js";

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
}

export const getUserByIdAndUpdate = async (id, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
        return user;
    } catch (error) {
        throw error;
    }
}