import User from "../models/userModel.js";
import { hashPassword, generateToken } from "../utils/helper.js";
import { createUser } from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password,role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const userData={
      name,
      email,
      password: hashedPassword,
      role
    }
    
    const user = await createUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = req.user;
    const token = generateToken(user.email, user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
