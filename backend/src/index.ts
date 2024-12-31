import express, { Express, Request, Response } from "express";
import config from "./config/index.js";
import sequelize from './config/db.js';
import './config/models.js';
import publicRouter from "./routes/public/index.js";
import router from "./routes/index.js";

await sequelize.sync({alter: true});

const app: Express = express();

app.use(express.json());
app.use('/public', publicRouter);
app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});