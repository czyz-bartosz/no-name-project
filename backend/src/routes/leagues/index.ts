import { Router, Request, Response } from "express";
import { addTeamToLeague, createLeagueController, generateLeagueSchedule } from "../../controllers/leagues/leaguesController.js";
const router = Router();

router
    .post("/", createLeagueController)
    .post("/:id/teams", addTeamToLeague)
    .post("/:id/matches/generate", generateLeagueSchedule);
    
export default router;