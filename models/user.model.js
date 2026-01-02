import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minlength: 2,
      maxlength: 55,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      lowercase: true,
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
