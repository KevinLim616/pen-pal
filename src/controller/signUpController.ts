import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Logger from "../lib/logger";
const prisma = new PrismaClient();

const signUpLogic = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: String(hashedPassword),
      },
    });
    res.json(user);
  } catch (err) {
    Logger.error(err);
  }
};

export default signUpLogic;
