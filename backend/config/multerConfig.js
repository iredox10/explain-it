import multer from 'multer'

export const  storage = new multerStorageCloudinary.CloudinaryStorage({  
  cloudinary: cloudinary,  
  params: {  
    folder: 'explain_it', // Optional folder in Cloudinary  
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],  
  },  
});  