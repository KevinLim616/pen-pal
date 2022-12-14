"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_middleware_1 = __importDefault(require("./middlewares/passport.middleware"));
const signUp_routes_1 = __importDefault(require("./routes/signUp.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const app = (0, express_1.default)();
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
exports.default = app;
