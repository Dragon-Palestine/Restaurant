import User from "../models/userModel.js";
import { hashPassword, generateToken } from "../utils/helper.js";
export const registerUser = async (req, res, next) => {
  const { name, email, password,role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
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
