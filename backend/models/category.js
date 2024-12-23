import mongoose from "mongoose";
import slug from "slug";

const category = await mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    about: {
      type: String,
    },
    posts: [
      {
        ref: "post",
        type: mongoose.Types.ObjectId,
      },
    ],
    priority: Number,
  },
  { timestamps: true }
);

category.pre("save", function () {
  if (this.name) {
    this.slug = slug(this.name);
  }
});

const Category = await mongoose.model("category", category);

export default Category;
