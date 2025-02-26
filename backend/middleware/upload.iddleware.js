import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // Ensure correct path

// Storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images", 
    allowed_formats: ["jpg", "png", "jpeg"], 
    resource_type: "image", // Ensures only images are stored
  },
});

export const upload = multer({ storage });
