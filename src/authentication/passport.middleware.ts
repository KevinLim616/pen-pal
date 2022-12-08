import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

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

export default passport;
