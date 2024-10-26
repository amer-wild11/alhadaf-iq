import prisma from "~/lib/prisma";
import { deleteFromCloudinary } from "~/utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const partnerId = event.context.params?.id; // الحصول على ID المشروع من الـURL

  if (!partnerId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Partner ID is required",
      })
    );
  }

  // الحصول على المشروع لإزالة الصور من Cloudinary
  const partner = await prisma.partner.findUnique({
    where: { id: String(partnerId) },
  });

  if (!partner) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Project not found",
      })
    );
  }

  // حذف الصور من Cloudinary وقاعدة البيانات
  await deleteFromCloudinary(partner.providerPublicId);

  // حذف المشروع من قاعدة البيانات
  await prisma.partner.delete({
    where: { id: String(partnerId) },
  });

  return {
    message: "Partner deleted successfully!",
  };
});
