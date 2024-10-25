export const useTransformers = () => {
  const userTransformer = (user: any) => {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return newUser;
  };

  return { userTransformer };
};
