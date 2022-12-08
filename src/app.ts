import express, { Express, Request, Response } from "express";
import Logger from "./lib/logger";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./authentication/passport.middleware";
import signUpRoute from "./authentication/signUp.routes";
import loginRoute from "./authentication/login.routes";
const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(
  session({
    secret: "chibai",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/sign-up", signUpRoute);
app.use("/login", loginRoute);
app.listen(PORT, () =>
  Logger.debug(`server listening on http://localhost:${PORT}`)
);
