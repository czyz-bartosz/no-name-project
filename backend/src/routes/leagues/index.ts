import { Router, Request, Response } from "express";
import { addTeamToLeague, createLeagueController, generateLeagueSchedule, getMyLeaguesController } from "../../controllers/leagues/leaguesController.js";
const router = Router();

router
    .post("/", createLeagueController)
    .post("/:id/teams", addTeamToLeague)
    .post("/:id/matches/generate", generateLeagueSchedule)
    .get("/mine", getMyLeaguesController);

export default router;