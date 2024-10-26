import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const partners = await prisma.partner.findMany();

  return {
    partners,
    count: partners.length,
  };
});
