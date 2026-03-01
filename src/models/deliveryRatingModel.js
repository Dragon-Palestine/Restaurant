import mongoose from "mongoose";
const { Schema } = mongoose;

const deliveryRatingSchema = new Schema(
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
    deliveryPerson: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent a user from submitting more than one rating per delivery person
deliveryRatingSchema.index({ deliveryPerson: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
deliveryRatingSchema.statics.calculateAverageRating = async function (
  deliveryPersonId,
) {
  const stats = await this.aggregate([
    { $match: { deliveryPerson: deliveryPersonId } },
    {
      $group: {
        _id: "$deliveryPerson",
        numReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const User = mongoose.model("User");
  if (stats.length > 0) {
    await User.findByIdAndUpdate(deliveryPersonId, {
      averageRating: stats[0].averageRating,
      numReviews: stats[0].numReviews,
    });
  }
};

// Call calculateAverageRating after save
deliveryRatingSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.deliveryPerson);
});

// Call calculateAverageRating after delete
deliveryRatingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.deliveryPerson);
  }
});

// Call calculateAverageRating after findOneAndUpdate
deliveryRatingSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.deliveryPerson);
  }
});

const DeliveryRating = mongoose.model("DeliveryRating", deliveryRatingSchema);
export default DeliveryRating;
