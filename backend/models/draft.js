
import mongoose, { mongo } from "mongoose";

const draft = await mongoose.Schema(
  {
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
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
    deleted: Boolean
  },
  { timestamps: true }
);

const Draft = await mongoose.model("draft", draft);

export default Draft;
