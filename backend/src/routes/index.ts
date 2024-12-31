import { Router, Request, Response } from "express";
import { verifyTokenMiddleware } from "../middlewares/index.js";
import verifyController from "../controllers/verifyController.js";
import showProfileController from "../controllers/users/showProfileController.js";
import editProfileController from "../controllers/users/editProfileController.js";
import teamRouter from "./teams/index.js";
import leagueRouter from "./leagues/index.js";

const router = Router();

router
    .use(verifyTokenMiddleware)
    .use("/teams", teamRouter)
    .use("/leagues", leagueRouter)
    .get("/verify", verifyController)
    .get("/profile", showProfileController)
    .patch("/profile", editProfileController);

export default router;