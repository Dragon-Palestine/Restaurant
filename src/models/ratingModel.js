import mongoose from "mongoose";
const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent a user from submitting more than one rating per food item
ratingSchema.index({ food: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
ratingSchema.statics.calculateAverageRating = async function (foodId) {
  const stats = await this.aggregate([
    { $match: { food: foodId } },
    {
      $group: {
        _id: "$food",
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const Food = mongoose.model("Food");
  if (stats.length > 0) {
    await Food.findByIdAndUpdate(foodId, {
      averageRating: stats[0].averageRating,
      numReviews: stats[0].numReviews,
    });
  }
};

// Call calculateAverageRating after save
ratingSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.food);
});

// Call calculateAverageRating after delete
ratingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.food);
  }
});

// Call calculateAverageRating after findOneAndUpdate
ratingSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.food);
  }
});

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
