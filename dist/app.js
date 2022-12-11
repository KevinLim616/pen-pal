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
const passport_middleware_1 = __importDefault(require("./authentication/passport.middleware"));
const signUp_routes_1 = __importDefault(require("./authentication/signUp.routes"));
const login_routes_1 = __importDefault(require("./authentication/login.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use((0, express_session_1.default)({
    secret: "chibai",
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_middleware_1.default.initialize());
app.use(passport_middleware_1.default.session());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ sessionId: req.sessionID });
    console.log(req.isAuthenticated());
});
app.use("/sign-up", signUp_routes_1.default);
app.use("/login", login_routes_1.default);
app.listen(PORT, () => logger_1.default.debug(`server listening on http://localhost:${PORT}`));
