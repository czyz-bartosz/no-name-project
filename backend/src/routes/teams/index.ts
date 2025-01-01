import { Router, Request, Response } from "express";
import createTeamController from "../../controllers/teams/createTeamController.js";
import deleteTeamController from "../../controllers/teams/deleteTeamController.js";
const router = Router();

router
    .post("/", createTeamController)
    .delete("/:id", deleteTeamController);

export default router;