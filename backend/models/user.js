import mongoose from "mongoose";

const user = await mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    drafts: [{ type: mongoose.Types.ObjectId, ref: "draft" }],
    resetToken: String,
    resetTokenExp: Date,
  },
  { timestamps: true }
);

const User = await mongoose.model("user", user);

export default User;
