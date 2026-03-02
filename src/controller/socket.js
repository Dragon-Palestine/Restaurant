import jwt from "jsonwebtoken";
import { getActiveUserById } from "../services/userService.js";

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("joinUserRoom", (userId) => {
      if (userId) {
        socket.join(userId);
        console.log(`Client ${socket.id} joined room for user ${userId}`);
      }
    });

    socket.on("joinAdminRoom", async (token) => {
      if (!token) {
        socket.emit("authError", {
          message: "Authentication token not provided.",
        });
        return;
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getActiveUserById(decoded.id);

        if (user && user.role === "admin") {
          socket.join("adminRoom");
          console.log(`Admin client ${socket.id} joined the admin room`);
        } else {
          socket.emit("authError", { message: "Unauthorized: Not an admin." });
        }
      } catch (error) {
        socket.emit("authError", { message: "Invalid token." });
      }
    });

    socket.on("joinFoodRoom", (foodId) => {
      if (foodId) {
        socket.join(`food_${foodId}`);
        console.log(`Client ${socket.id} joined room for food ${foodId}`);
      }
    });

    socket.on("leaveFoodRoom", (foodId) => {
      if (foodId) {
        socket.leave(`food_${foodId}`);
        console.log(`Client ${socket.id} left room for food ${foodId}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
