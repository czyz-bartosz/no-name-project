import { Router, Request, Response } from "express";
import { verifyTokenMiddleware } from "../middlewares/index.js";
import verifyController from "../controllers/verifyController.js";

const router = Router();

router
    .use(verifyTokenMiddleware)
    .get("/verify", verifyController);

export default router;