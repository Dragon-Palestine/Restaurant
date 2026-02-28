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
    const user = await User.findOne({ _id: id, isDeleted: { $ne: true } });
    return user;
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
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
    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      updateData,
      {
        returnDocument: "after",
        ...options,
      },
    );
    return user;
  } catch (error) {
    throw error;
  }
};
export const getUserByIdAndUpdate = async (id, updateData, options) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, },
      updateData,
      {
        returnDocument: "after",
        ...options,
      },
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const getActiveUserByIdAndSoftDelete = async (id) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { returnDocument: "after" },
    );
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllActiveUsers = async () => {
  try {
    const users = await User.find({ isDeleted: { $ne: true } }, "-password"); //without password
    return users;
  } catch (error) {
    throw error;
  }
};
