import formidable from "formidable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { createProject, createProjectImage } from "~/server/db/projects";
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
  if (!fields.name || !fields.location || !fields.desc) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid params",
      })
    );
  }

  // إنشاء المشروع الجديد
  const project = await createProject({
    name: fields.name[0],
    location: fields.location[0],
    desc: fields.desc[0],
  });

  // التعامل مع رفع الصور إلى Cloudinary
  const filePromises = Object.keys(files).map(async (key) => {
    const uploadedFiles = Array.isArray(files[key]) ? files[key] : [files[key]];

    // التعامل مع كل صورة في المصفوفة
    const imageUploadPromises = uploadedFiles.map(async (file) => {
      const cloudinaryResource = await uploadToCloudinary(file.filepath);

      return await createProjectImage({
        url: cloudinaryResource.secure_url,
        projectId: project.id,
        providerPublicId: cloudinaryResource.public_id,
      });
    });

    return await Promise.all(imageUploadPromises);
  });

  await Promise.all(filePromises.flat());

  // استرجاع الصور المرتبطة بالمشروع
  const projectImages = await prisma.projectImage.findMany({
    where: { projectId: project.id },
  });

  // تحويل البيانات النهائية وإرجاعها
  return {
    message: "Project created successfully!",
    project: {
      id: project.id,
      location: project.location,
      name: project.name,
      desc: project.desc,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      images: projectImages, // الصور المرفوعة
    },
  };
});
