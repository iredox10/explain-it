import mongoose from "mongoose";
const connectMongoose = async () => {
  try {
    const res = await mongoose.connect("mongodb://localhost/explain-it");
    console.log("connected");
  } catch (err) {
    console.log("error connecting to mongoose:" + err.message);
  }
};


export default connectMongoose