import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandel.js";

// Routes
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import ratingRoute from "./routes/ratingRoute.js";
import deliveryRatingRoute from "./routes/deliveryRatingRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// api endpoints
app.use("/api/foods", foodRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/foods/:foodId/ratings", ratingRoute);
app.use("/api/users/:id/ratings", deliveryRatingRoute);

// Get the directory name of the current module to create an absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// To serve image files from the "uploads" folder
app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware should be the last one
app.use(errorHandler);

export default app;
