import prisma from "~/lib/prisma";
import { deleteFromCloudinary } from "~/utils/cloudinary";

export default defineEventHandler(async (event) => {
  const customerId = event.context.params?.id;
  if (!customerId) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Customer id is required!",
      })
    );
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Customer not found!",
      })
    );
  }

  await prisma.customer.delete({
    where: { id: String(customerId) },
  });

  return {
    message: "Customer deleted successfully!",
  };
});
