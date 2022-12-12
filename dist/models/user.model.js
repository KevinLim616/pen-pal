"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: "Username field is required",
    })
        .min(6, "Username must be at least 6 characters"),
    email: zod_1.z
        .string({
        required_error: "Email field is required",
        invalid_type_error: "This field must be in email format",
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: "Password field is required",
    })
        .min(6, "Password must be at least 6 characters"),
    //TODO: add DOB, languageSpoken
});
