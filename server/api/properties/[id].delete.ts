import prisma from "~/lib/prisma";
import { deleteFromCloudinary } from "~/utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const propertyId = event.context.params?.id; // الحصول على ID المشروع من الـURL

  if (!propertyId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Property ID is required",
      })
    );
  }

  // الحصول على المشروع لإزالة الصور من Cloudinary
  const property = await prisma.property.findUnique({
    where: { id: String(propertyId) },
    include: { propertyImage: true }, // جلب الصور المرتبطة بالمشروع
  });

  if (!property) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "property not found",
      })
    );
  }

  // حذف الصور من Cloudinary وقاعدة البيانات
  await Promise.all(
    property.propertyImage.map(async (image) => {
      await deleteFromCloudinary(image.providerPublicId);

      // حذف الصورة من قاعدة البيانات
      await prisma.propertyImage.delete({
        where: { id: image.id }, // تأكد من استخدام معرف الصورة الصحيح
      });
    })
  );

  // حذف المشروع من قاعدة البيانات
  await prisma.property.delete({
    where: { id: String(propertyId) },
  });

  return {
    message: "property deleted successfully!",
  };
});
