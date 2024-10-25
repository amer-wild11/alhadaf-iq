import prisma from "~/lib/prisma";

interface Project {
  id: String;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  image: any;
}

export default defineEventHandler(async (event) => {
  const projects = await prisma.project.findMany();
  const projectImages = await prisma.projectImage.findMany();

  const transformedProjects: Project[] = [];

  projects.forEach((project) => {
    const projectImage = projectImages.find(
      (img) => img.projectId === project.id
    );

    const newProject: Project = {
      id: project.id,
      name: project.name,
      location: project.location,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      image: projectImage,
    };

    transformedProjects.push(newProject);
  });

  return {
    projects: transformedProjects,
    count: projects.length,
  };
});