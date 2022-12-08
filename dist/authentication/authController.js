"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUpLogic = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../lib/logger"));
const passport_1 = __importDefault(require("passport"));
const prisma = new client_1.PrismaClient();
const signUpLogic = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: String(hashedPassword),
            },
        });
        res.json(user);
    }
    catch (err) {
        logger_1.default.error(err);
    }
};
exports.signUpLogic = signUpLogic;
const login = (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
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
