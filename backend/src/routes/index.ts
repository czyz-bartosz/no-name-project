import { Router, Request, Response } from "express";
import { verifyTokenMiddleware } from "../middlewares/index.js";
import verifyController from "../controllers/verifyController.js";
import showProfileController from "../controllers/users/showProfileController.js";
import editProfileController from "../controllers/users/editProfileController.js";

const router = Router();

router
    .use(verifyTokenMiddleware)
    .get("/verify", verifyController)
    .get("/profile", showProfileController)
    .patch("/profile", editProfileController);

export default router;