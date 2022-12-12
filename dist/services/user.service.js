"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createUser = async ({ username, email, password }) => {
    const user = await prisma_1.default.user.create({
        data: {
            username: username,
            email: email,
            password: password,
        },
    });
    return user;
};
exports.createUser = createUser;
