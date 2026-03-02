export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("joinUserRoom", (userId) => {
      if (userId) {
        socket.join(userId);
        console.log(`Client ${socket.id} joined room for user ${userId}`);
      }
    });

    socket.on("joinAdminRoom", () => {
      socket.join("adminRoom");
      console.log(`Client ${socket.id} joined the admin room`);
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
