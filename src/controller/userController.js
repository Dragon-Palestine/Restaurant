import { hashPassword, generateToken } from "../utils/helper.js";
import { createUser,getUserByIdAndUpdate,getUserById } from "../services/userService.js";

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

export const updateUser= async (req, res, next) => {
  const { name, email, password, role,oldPassword} = req.body;
  try {
    const user = await getUserById(req.params.id);
    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
      password: password ? await hashPassword(password) : user.password,
    };

    const updatedUser = await getUserByIdAndUpdate(req.params.id, updatedData);

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
}
