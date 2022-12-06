"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./lib/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const signUp_route_1 = __importDefault(require("./routes/signUp.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/sign-up", signUp_route_1.default);
app.use((0, express_session_1.default)({
    secret: "chibai",
    resave: true,
    saveUninitialized: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.listen(PORT, () => logger_1.default.debug(`server listening on http://localhost:${PORT}`));
