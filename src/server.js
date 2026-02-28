import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import {initOwner} from "./controller/userController.js"

const PORT = process.env.BACKEND_PORT||4000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    const initialized=await initOwner();
    if(initialized){
      console.log("Owner initialized");
    }
  });
});
