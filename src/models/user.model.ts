import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "Username field is required",
    })
    .min(6, "Username must be at least 6 characters"),
  email: z
    .string({
      required_error: "Email field is required",
      invalid_type_error: "This field must be in email format",
    })
    .email(),
  password: z
    .string({
      required_error: "Password field is required",
    })
    .min(6, "Password must be at least 6 characters"),
  //TODO: add DOB, languageSpoken
});

export type UserModel = z.infer<typeof userSchema>;
