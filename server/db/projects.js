import prisma from "~/lib/prisma";

export const createProject = async (data) => {
    const project = await prisma.project.create({
        data: data
    })
    return project
}

export const findProjectByParams = async (params) => {
    const { name, location } = params;

    const searchParam =  location || name;

    if (!searchParam) {
        throw new Error('No search parameter provided.');
    }

    let project;
    if (name) {
        project = prisma.project.findUnique({
            where: { name }
        })
    }  else if (location) {
        project = await prisma.project.findFirst({
            where: { location },
        });
    }

    return project;
};

export const createProjectImage = async (data) => {
    const projectImage = await prisma.projectImage.create({data})
    return projectImage
}