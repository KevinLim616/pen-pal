import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Logger from "../lib/logger";
import passport from "passport";
const prisma = new PrismaClient();

export const signUpLogic = async (req: Request, res: Response) => {
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

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({
        message: "email or password is not matched.",
      });
    }
    req.login(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user,
      });
    });
  })(req, res, next);
};
