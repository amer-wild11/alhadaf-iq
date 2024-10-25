import { findUserByParams } from "~/server/db/users";
import { useTransformers } from "~/composables/transformers";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userTransformer } = useTransformers();
  const { email, password } = body;

  if (!email || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }
  const user = await findUserByParams({ email: "alhadaf@gmail.com" });

  if (password == user?.password) {
    return {
      user: userTransformer(user),
    };
  } else {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "password is wrong!" })
    );
  }
});
