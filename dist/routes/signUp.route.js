"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpController_1 = __importDefault(require("../controller/signUpController"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("sign-up route");
});
router.post("/", signUpController_1.default);
exports.default = router;
