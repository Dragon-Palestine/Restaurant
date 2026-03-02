import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { initializeSocket } from "./socket.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

app.set("io", io);

initializeSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server with Socket.IO is running on http://localhost:${PORT}`);
});
