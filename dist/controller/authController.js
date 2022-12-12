"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUpLogic = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../lib/logger"));
const passport_1 = __importDefault(require("passport"));
const runtime_1 = require("@prisma/client/runtime");
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
const signUpLogic = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        //
        const result = user_model_1.userSchema.safeParse({
            username,
            email,
            password: String(hashedPassword),
        });
        //
        res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof runtime_1.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                // status code might need to change
                res.status(401).json({ message: "email already taken" });
            }
            else {
                logger_1.default.error(err);
            }
        }
        else if (err instanceof zod_1.ZodError) {
            return { success: false, errors: err.flatten() };
        }
        else {
            throw err;
        }
    }
};
exports.signUpLogic = signUpLogic;
const login = (req, res, next) => {
    passport_1.default.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
    }, (err, user, info) => {
        if (!user) {
            return res.status(401).json({
                message: "email or password is not matched.",
            });
        }
        req.login(user, (err) => {
            if (err)
                throw err;
            res.status(201).json({
                user,
            });
        });
    })(req, res, next);
};
exports.login = login;
