import formidable from "formidable";
import { createPartner } from "~/server/db/partners";
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
  if (!fields.name[0] || files.length < 1) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid params",
      })
    );
  }
  const name = fields.name[0];
  const logo = files.logo[0];

  const cloudinaryResource = await uploadToCloudinary(logo.filepath);
  // إنشاء المشروع الجديد
  const partner = await createPartner({
    name: name,
    logo: cloudinaryResource,
    providerPublicId: cloudinaryResource.public_id,
  });

  // تحويل البيانات النهائية وإرجاعها
  return {
    message: "partner created successfully!",
    partner,
  };
});
