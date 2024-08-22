import cloudinary from "cloudinary";
import multerStorageCloudinary from "multer-storage-cloudinary";


export const cloudinaryConfig = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "explain_it", // Optional folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});
