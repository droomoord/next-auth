import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    maxlength: [40, "Cannot be more than 40 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  verified: {
    isVerified: {
      type: Boolean,
      default: false,
    },
    hash: {
      type: String,
    },
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
