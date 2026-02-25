import User from "../models/userModel.js";

export const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getActiveUserById = async (id) => {
  try {
    const user = await User.findById(id, { isDeleted: { $ne: true } });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getActiveUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email, isDeleted: { $ne: true } });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getActiveUserByIdAndUpdate = async (id, updateData, options) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      ...options,
      isDeleted: { $ne: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getActiveUserByIdAndSoftDelete = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { returnDocument: "after" },
    );
    return user;
  } catch (error) {
    throw error;
  }
};
