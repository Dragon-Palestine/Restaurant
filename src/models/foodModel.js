import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (val) => Math.round(val * 10) / 10, // Rounds to one decimal place
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
