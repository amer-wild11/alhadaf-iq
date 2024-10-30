import prisma from "~/lib/prisma";

export const createProperty = async (data) => {
  const property = await prisma.property.create({
    data: data,
  });
  return property;
};

export const findPropertyByParams = async (params) => {
  const { name } = params;

  const searchParam = name;

  if (!searchParam) {
    throw new Error("No search parameter provided.");
  }

  let property;
  if (name) {
    property = prisma.property.findUnique({
      where: { name },
    });
  }

  return property;
};

export const createPropertyImage = async (data) => {
  const propertyImage = await prisma.propertyImage.create({ data });
  return propertyImage;
};
