import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { NextFunction, Request, Response } from "express";
import Logger from "../lib/logger";
import passport from "passport";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserModel, userSchema } from "../models/user.model";
import { createUser } from "../services/user.service";
import { ZodError } from "zod";

export const signUpLogic = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //
    const result = userSchema.safeParse({
      username,
      email,
      password: String(hashedPassword),
    });
    //
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        // status code might need to change
        res.status(401).json({ message: "email already taken" });
      } else {
        Logger.error(err);
      }
    } else if (err instanceof ZodError) {
      return { success: false, errors: err.flatten() };
    } else {
      throw err;
    }
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    {
      successRedirect: "/",
      failureRedirect: "/",
    },
    (err, user, info) => {
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
    }
  )(req, res, next);
};
