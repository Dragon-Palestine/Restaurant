import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const unlikeFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted successfully.`);
    } else {
      throw new Error(`File ${filePath} does not exist.`);
    }
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

export const hashPassword = async (password) => {
  try {
    if (!process.env.SALT_ROUNDS) {
      const error = new Error(".env 'SALT_ROUNDS' is empty");
      error.statusCode = 404;
      throw error;
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    if (!error.message) error.message = "Error hashing password";
    throw error;
  }
};
export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

export const validId = (id) => {
  const isValid = /^[0-9a-fA-F]{24}$/.test(id);
  return isValid;
};

export const generateToken = (email, id,role) => {
  try {
    if (!process.env.EXPIRES_IN || !process.env.JWT_SECRET) {
      const error = new Error(".env 'EXPIRES_IN or JWT_SECRET' is empty");
      error.statusCode = 404;
      throw error;
    }
    return jwt.sign({ id, email,role }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
  } catch (error) {
    if (!error.message) error.message = "fild to generate Token .";
    throw error;
  }
};
