import prisma from "~/lib/prisma";

export const createUser = async (data) => {
    const user = await prisma.user.create({
        data: data
    })
    return user
}

export const findUserByParams = async (params) => {
    const { id, email, name } = params;

    const searchParam = id || email || name;

    if (!searchParam) {
        throw new Error('No search parameter provided.');
    }

    let user;
    if (id) {
        user = await prisma.user.findUnique({
            where: { id: parseInt(id) }, // تأكد من تحويل id إلى عدد صحيح
        });
    } else if (email) {
        user = await prisma.user.findUnique({
            where: { email },
        });
    } else if (name) {
        user = await prisma.user.findFirst({
            where: { name },
        });
    }

    return user;
};