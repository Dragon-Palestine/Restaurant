import { hashPassword, generateToken } from "../utils/helper.js";
import {
  createUser,
  getActiveUserByIdAndUpdate,
  getActiveUserById,
  getActiveUserByIdAndSoftDelete,
  getAllActiveUsers
} from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
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
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
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

export const getAllUsers=async(req,res,next)=>{
  try{
    const users=await getAllActiveUsers();
    res.status(200).json({
      data:users,
      success:true,
      masseage:"Users fetched successfully"
    })
  } catch(error){
    next(error);
  }
}