import mongoose, { mongo } from "mongoose";
import slug from "slug";

const post = await mongoose.Schema(
  {
    coverImage: String,
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
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
    heading: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

post.pre("save", function () {
  if (this.title) {
    this.slug = slug(this.title);
  }
});

const Post = await mongoose.model("post", post);

export default Post;
