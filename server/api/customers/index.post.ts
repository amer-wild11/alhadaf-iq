import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Invalid params" })
    );
  }
  const data = {
    name,
    email,
    phone: JSON.stringify(phone),
    message,
  };

  const customer = await prisma.customer.create({ data });

  return {
    customer,
    message: "Customer created succesfuly",
  };
});
