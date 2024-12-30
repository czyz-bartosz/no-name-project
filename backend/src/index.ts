import express, { Express, Request, Response } from "express";
import config from "./config.js";
import sequelize from './db.js';
import './models/User.js';
import router from "./routes/auth.js";

await sequelize.sync();

const app: Express = express();

app.use(express.json());
app.use(router);

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});