import { Router } from "express";
import { userLogin } from "../../controllers/users/userLoginController.js";
import { userRegistrationController } from "../../controllers/users/userRegistrationController.js";
import showTeamsController from "../../controllers/teams/showTeamController.js";
import showUsersController from "../../controllers/users/showUsersController.js";
import { getLeagueMatchesById, getLeaguesController, getLeagueTeamsById } from "../../controllers/leagues/leaguesController.js";
import { getMatchByIdController, showMatchesController } from "../../controllers/matches/matchesController.js";
import express from 'express';
import getLeagueTableController from "../../controllers/leagues/getLeagueTableController.js";
const router = Router();

router.use(express.static('public'));
router.post("/login", userLogin);
router.post("/register", userRegistrationController);
router.get("/teams", showTeamsController);
router.get("/users", showUsersController);
router.get("/leagues", getLeaguesController);
router.get("/leagues/:id/matches", getLeagueMatchesById);
router.get("/leagues/:id/teams", getLeagueTeamsById);
router.get("/matches/:id", getMatchByIdController);
router.get("/matches", showMatchesController);
router.get("/leagues/:id/table", getLeagueTableController);

export default router;