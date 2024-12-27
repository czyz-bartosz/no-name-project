import express, { Express, Request, Response } from "express";
import config from "./config";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("main backend!");
});

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`);
});