import mongoose from "mongoose";

const author = await mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique:true
    },
    about: {
      type: String,
      required: true,
    },
    postion: {
      type: String,
    },
    isAuthor:{
      type: String,
      default: true
    },
    posts: [
      {
        ref: "post",
        type: mongoose.Types.ObjectId,
      },
    ],
    drafts: [{ type: mongoose.Types.ObjectId, ref: "draft" }],
    image: String,
    links: [String],
    facebook: String,
    twitter: String,
    whatsapp: String,
    password: String
  },
  { timestamps: true }
);

const Author = await mongoose.model("author", author);

export default Author;
