import mongoose, { mongo } from "mongoose";

const post = await mongoose.Schema(
  {
    coverImage: String,
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    category: String,
    author: [String],
    images: {
      type: [String],
      default: [],
    },
    priority: {
      type: Number,
    },
    heading:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Post = await mongoose.model("post", post);

export default Post;
