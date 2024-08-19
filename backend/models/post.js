import mongoose, { mongo } from "mongoose";

const post = await mongoose.Schema(
  {
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
    image: String,
    priority: {
      type: Number,
    },
    drafts: [{ type: mongoose.Types.ObjectId, ref: "draft" }],
  },
  { timestamps: true }
);

const Post = await mongoose.model("post", post);

export default Post;
