import formidable from "formidable";
import prisma from "~/lib/prisma";
import { uploadToCloudinary } from "~/utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const projectId = event.context.params?.id; // الحصول على ID المشروع من الـURL

  if (!projectId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Project ID is required",
      })
    );
  }

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

  // تحديث الحقول النصية (name، location)
  const updateData: any = {};
  if (fields.name) updateData.name = fields.name[0];
  if (fields.location) updateData.location = fields.location[0];

  // تحديث المشروع في قاعدة البيانات
  const updatedProject = await prisma.project.update({
    where: { id: String(projectId) },
    data: updateData,
  });

  // التعامل مع رفع الصور إلى Cloudinary
  if (files) {
    const filePromises = Object.keys(files).map(async (key) => {
      const uploadedFiles = Array.isArray(files[key])
        ? files[key]
        : [files[key]];

      // التعامل مع كل صورة في المصفوفة
      const imageUploadPromises = uploadedFiles.map(async (file) => {
        const cloudinaryResource = await uploadToCloudinary(file.filepath);

        // إنشاء سجل للصورة في قاعدة البيانات
        return await prisma.projectImage.create({
          data: {
            url: cloudinaryResource.secure_url,
            projectId: projectId,
            providerPublicId: cloudinaryResource.public_id,
          },
        });
      });

      return await Promise.all(imageUploadPromises);
    });

    await Promise.all(filePromises.flat());
  }

  // استرجاع الصور المرتبطة بالمشروع
  const projectImages = await prisma.projectImage.findMany({
    where: { projectId: projectId },
  });

  // تحويل البيانات النهائية وإرجاعها
  return {
    message: "Project updated successfully!",
    project: {
      id: updatedProject.id,
      location: updatedProject.location,
      name: updatedProject.name,
      createdAt: updatedProject.createdAt,
      updatedAt: updatedProject.updatedAt,
      images: projectImages, // الصور المرفوعة
    },
  };
});
