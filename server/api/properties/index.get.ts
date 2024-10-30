import prisma from "~/lib/prisma";

interface property {
  id: String;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  images: any;
}

export default defineEventHandler(async (event) => {
  const properties = await prisma.property.findMany();
  const propertyImages = await prisma.propertyImage.findMany();

  const transformedProperty: property[] = [];

  properties.forEach((property) => {
    const propertyImage = propertyImages.filter(
      (img) => img.propertyId === property.id
    );

    const newProperty: property = {
      id: property.id,
      name: property.name,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      images: propertyImage,
    };

    transformedProperty.push(newProperty);
  });

  return {
    properties: transformedProperty,
    count: properties.length,
  };
});
