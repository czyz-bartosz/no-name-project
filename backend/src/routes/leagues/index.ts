import { Router, Request, Response } from "express";
import { addTeamToLeague, createLeagueController } from "../../controllers/leagues/leaguesController.js";
const router = Router();

router
    .post("/", createLeagueController)
    .post("/:id/teams", addTeamToLeague);

export default router;