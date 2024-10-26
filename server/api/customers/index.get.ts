import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const customers = await prisma.customer.findMany();
  return {
    customers,
    count: customers.length,
  };
});
