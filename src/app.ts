import express, { Express, Request, Response } from "express";
import Logger from "./lib/logger";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import signUpRoute from "./routes/signUp.route";
const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/sign-up", signUpRoute);
app.use(
  session({
    secret: "chibai",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () =>
  Logger.debug(`server listening on http://localhost:${PORT}`)
);
