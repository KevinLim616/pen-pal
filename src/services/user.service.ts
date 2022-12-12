import prisma from "../lib/prisma";
import { UserModel } from "../models/user.model";

export const createUser = async ({ username, email, password }: UserModel) => {
  const user: UserModel = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  return user;
};
