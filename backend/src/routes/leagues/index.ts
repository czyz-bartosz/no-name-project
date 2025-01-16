import { Router } from "express";
import generateLeagueSchedule from "../../controllers/leagues/generateLeagueSchedule.js";
import createLeagueController from "../../controllers/leagues/createLeagueController.js";
import getMyLeaguesController from "../../controllers/leagues/getMyLeaguesController.js";
import addTeamToLeague from "../../controllers/leagues/addTeamToLeague.js";
import deleteLeagueController from "../../controllers/leagues/deleteLeagueController.js";

const router = Router();

router
    .post("/", createLeagueController)
    .post("/:id/teams", addTeamToLeague)
    .delete("/:id/", deleteLeagueController)
    .post("/:id/matches/generate", generateLeagueSchedule)
    .get("/mine", getMyLeaguesController);

export default router;