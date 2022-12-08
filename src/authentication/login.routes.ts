import express, { Request, Response } from "express";
import { login } from "./authController";
const router = express.Router();

router.post("/", login);

export default router;
