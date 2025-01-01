import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/index.js";
import verifyController from "../controllers/verifyController.js";
import showProfileController from "../controllers/users/showProfileController.js";
import editProfileController from "../controllers/users/editProfileController.js";
import teamRouter from "./teams/index.js";
import leagueRouter from "./leagues/index.js";
import matchRouter from "./matches/index.js";
import refereeRouter from "./referee/index.js";

const router = Router();

router
    .use(verifyTokenMiddleware)
    .use("/teams", teamRouter)
    .use("/leagues", leagueRouter)
    .use("/matches", matchRouter)
    .use("/referee", refereeRouter)
    .get("/verify", verifyController)
    .get("/profile", showProfileController)
    .patch("/profile", editProfileController);

export default router;