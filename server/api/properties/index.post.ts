import formidable from "formidable";
import prisma from "~/lib/prisma";

import { createProperty, createPropertyImage } from "~/server/db/property";
import { uploadToCloudinary } from "~/utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  // قراءة البيانات من الـ form-data
  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files }: any = response;

  // تحقق من الحقول المطلوبة
  if (!fields.name) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid params",
      })
    );
  }

  // إنشاء المشروع الجديد
  const property = await createProperty({
    name: fields.name[0],
  });

  // التعامل مع رفع الصور إلى Cloudinary
  const filePromises = Object.keys(files).map(async (key) => {
    const uploadedFiles = Array.isArray(files[key]) ? files[key] : [files[key]];

    // التعامل مع كل صورة في المصفوفة
    const imageUploadPromises = uploadedFiles.map(async (file) => {
      const cloudinaryResource = await uploadToCloudinary(file.filepath);

      return await createPropertyImage({
        url: cloudinaryResource.secure_url,
        propertyId: property.id,
        providerPublicId: cloudinaryResource.public_id,
      });
    });

    return await Promise.all(imageUploadPromises);
  });

  await Promise.all(filePromises.flat());

  // استرجاع الصور المرتبطة بالمشروع
  const propertyImages = await prisma.propertyImage.findMany({
    where: { propertyId: property.id },
  });

  // تحويل البيانات النهائية وإرجاعها
  return {
    message: "Property created successfully!",
    property: {
      id: property.id,
      name: property.name,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      images: propertyImages, // الصور المرفوعة
    },
  };
});
