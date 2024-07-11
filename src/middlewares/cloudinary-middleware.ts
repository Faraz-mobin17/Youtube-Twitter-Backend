import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../index.js";
import fs from "fs";
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localImagePath: string): Promise<any> => {
  try {
    if (!localImagePath) return null;
    const response = await cloudinary.uploader.upload(localImagePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localImagePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localImagePath);
    console.log("Cloudinary image error");
    throw error;
  }
};

const deleteFromCloudinary = async (
  publicId: string,
  resource_type: string = "image"
): Promise<any> => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resource_type,
    });
    return response;
  } catch (error) {
    console.log("delete on cloudinary failed error");
    throw error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
