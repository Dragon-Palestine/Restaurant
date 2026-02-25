import jwt from "jsonwebtoken";
import { getUserById } from "../services/userService.js";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res
        .status(403)
        .json({ success: false, message: "Forbidden: Admins only" });
    }
  } catch (error) {
    next(error);
  }
};
