import prisma from "~/lib/prisma";

interface Project {
  id: String;
  name: string;
  location: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  images: any;
}

export default defineEventHandler(async (event) => {
  const projects = await prisma.project.findMany();
  const projectsImages = await prisma.projectImage.findMany();

  const transformedProjects: Project[] = [];

  projects.forEach((project) => {
    const projectImages = projectsImages.filter(
      (img) => img.projectId === project.id
    );

    const newProject: Project = {
      id: project.id,
      name: project.name,
      location: project.location,
      desc: project.desc,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      images: projectImages,
    };

    transformedProjects.push(newProject);
  });

  return {
    projects: transformedProjects,
    count: projects.length,
  };
});
