import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dollzvp8s",
  api_key: "744599439297542",
  api_secret: "5nf1g6UAP2R75SENKjphypFyiFU",
});

export const uploadToCloudinary = (image) => {
  cloudinary.api.resources();
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
