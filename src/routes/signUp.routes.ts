import express, { Request, Response } from "express";
import { signUpLogic } from "../controller/authController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("sign-up route");
});
router.post("/", signUpLogic);

export default router;
