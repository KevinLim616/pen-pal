import app from "./app";
import Logger from "./lib/logger";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () =>
  Logger.debug(`server listening on http://localhost:${PORT}`)
);
