import express, { Express, Request, Response } from "express";
import Logger from "./lib/logger";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import signUpRoute from "./routes/signUp.route";
import { PrismaClient } from "@prisma/client";
const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;
const prisma = new PrismaClient();
app.use(
  session({
    secret: "chibai",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) {
    return done("User not found");
  } else {
    done(null, user);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/sign-up", signUpRoute);
app.listen(PORT, () =>
  Logger.debug(`server listening on http://localhost:${PORT}`)
);
