import { Router } from "express";
import createTeamController from "../../controllers/teams/createTeamController.js";
import deleteTeamController from "../../controllers/teams/deleteTeamController.js";
import getMyTeamsController from "../../controllers/teams/getMyTeamsController.js";
const router = Router();

router
    .post("/", createTeamController)
    .delete("/:id", deleteTeamController)
    .get("/mine", getMyTeamsController);

export default router;