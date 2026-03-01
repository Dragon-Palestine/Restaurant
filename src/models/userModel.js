import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    favorites: {
      type: [{ type: Schema.Types.ObjectId, ref: "Food" }],
      default: [],
    },
    role: {
      type: String,
      enum: ["customer", "owner", "admin","admin_pending", "delivery"],
      default: "customer",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { minimize: false },
); // to store empty objects in cartData

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
