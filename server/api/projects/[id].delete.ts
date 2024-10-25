import prisma from "~/lib/prisma";
import { deleteFromCloudinary } from "~/utils/cloudinary.js";

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

  // الحصول على المشروع لإزالة الصور من Cloudinary
  const project = await prisma.project.findUnique({
    where: { id: String(projectId) },
    include: { projectImage: true }, // جلب الصور المرتبطة بالمشروع
  });

  if (!project) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Project not found",
      })
    );
  }

  // حذف الصور من Cloudinary وقاعدة البيانات
  await Promise.all(
    project.projectImage.map(async (image) => {
      await deleteFromCloudinary(image.providerPublicId);

      // حذف الصورة من قاعدة البيانات
      await prisma.projectImage.delete({
        where: { id: image.id }, // تأكد من استخدام معرف الصورة الصحيح
      });
    })
  );

  // حذف المشروع من قاعدة البيانات
  await prisma.project.delete({
    where: { id: String(projectId) },
  });

  return {
    message: "Project deleted successfully!",
  };
});
