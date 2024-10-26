import prisma from "~/lib/prisma";

export const createPartner = async (data) => {
  const partner = await prisma.partner.create({ data });
  return partner;
};
