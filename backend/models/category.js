import mongoose from "mongoose";

const category = await mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
      unique: true
    },
    about:{
      type: String,
    },
    posts: [
      {
        ref: "post",
        type: mongoose.Types.ObjectId,
      },
    ],
    priority: Number
  },
  { timestamps: true }
);

const Category = await mongoose.model("category", category);

export default Category