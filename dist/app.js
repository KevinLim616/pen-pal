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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const signUp_route_1 = __importDefault(require("./routes/signUp.route"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
const prisma = new client_1.PrismaClient();
app.use((0, express_session_1.default)({
    secret: "chibai",
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cookie_parser_1.default)());
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        return done(null, false, { message: "Incorrect email" });
    }
    bcryptjs_1.default.compare(password, user.password, (err, res) => {
        if (res) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Incorrect password" });
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
        return done("User not found");
    }
    else {
        done(null, user);
    }
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/sign-up", signUp_route_1.default);
app.listen(PORT, () => logger_1.default.debug(`server listening on http://localhost:${PORT}`));
