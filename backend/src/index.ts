import express, { Express, Request, Response } from "express";
import config from "./config/index.js";
import sequelize from './config/db.js';
import './config/models.js';
import publicRouter from "./routes/public/index.js";
import router from "./routes/index.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

await sequelize.sync();

const app: Express = express();

app.use(cookieParser());
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,
  credentials: true,
}));
app.use(express.json({ limit: '4mb' }));
app.use('/public', publicRouter);
app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});