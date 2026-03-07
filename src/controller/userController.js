import { hashPassword, generateToken } from "../utils/helper.js";
import {
  createUser,
  getActiveUserByIdAndUpdate,
  getActiveUserById,
  getActiveUserByIdAndSoftDelete,
  getAllActiveUsers,
  getActiveUserByEmail,
  getUserByIdAndUpdate,
} from "../services/userService.js";
import { userResponse } from "../utils/responseFormatters.js";

export const initOwner = async () => {
  const user = await getActiveUserByEmail("loai@gmail.com");
  if (user) return 0;
  const hashedPassword = await hashPassword("1234");
  await createUser({
    name: "loai",
    email: "loai@gmail.com",
    password: hashedPassword,
    role: "owner",
  });
  return 1;
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let { role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    role = role == "admin" ? "admin_pending" : role;

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };
    const user = await createUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
};
export const makeAdmin = async (req, res, next) => {
  try {
    const updatedUser = await getActiveUserByIdAndUpdate(req.params.id, {
      role: "admin",
    });
    res.status(200).json({
      success: true,
      message: "User made admin successfully",
      data: userResponse(updatedUser),
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = req.user;
    const token = generateToken(user.email, user._id, user.role);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userResponse(user),
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email, password, role, oldPassword } = req.body;
  try {
    const user = await getActiveUserById(req.params.id);
    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
      password: password ? await hashPassword(password) : user.password,
    };

    const updatedUser = await getActiveUserByIdAndUpdate(
      req.params.id,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: userResponse(updatedUser),
    });
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getActiveUserByIdAndSoftDelete(id);
    res.status(200).json({
      success: true,
      message: "User removed successfully",
      data: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

export const restoreUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdAndUpdate(id, {
      isDeleted: false,
      deletedAt: null,
    });
    res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllActiveUsers();
    res.status(200).json({
      data: users.map(userResponse),
      success: true,
      masseage: "Users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
