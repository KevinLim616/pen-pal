"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    const user = await prisma_1.default.user.findFirst({ where: { email } });
    if (!user) {
        return done(null, false, { message: "Incorrect email" });
    }
    bcryptjs_1.default.compare(password, user.password, (err, res) => {
        if (res) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Incorrect password" });
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await prisma_1.default.user.findFirst({ where: { id } });
    if (!user) {
        return done("User not found");
    }
    else {
        done(null, user);
    }
});
exports.default = passport_1.default;
