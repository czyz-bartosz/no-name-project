import { Router } from "express";
import { userLogin } from "../../controllers/users/userLoginController.js";
import { userRegistrationController } from "../../controllers/users/userRegistrationController.js";
import getTeamsController from "../../controllers/teams/getTeamsController.js";
import showUsersController from "../../controllers/users/showUsersController.js";
import { getMatchByIdController, showMatchesController } from "../../controllers/matches/matchesController.js";
import getLeaguesController from "../../controllers/leagues/getLeaguesController.js";
import getLeagueTeamsById from "../../controllers/leagues/getLeagueTeamsById.js";
import getLeagueMatchesById from "../../controllers/leagues/getLeagueMatchesById.js";
import express from 'express';
import getLeagueTableController from "../../controllers/leagues/getLeagueTableController.js";
import getLeagueById from "../../controllers/leagues/getLeagueById.js";
const router = Router();

router.use(express.static('public'));
router.post("/login", userLogin);
router.post("/register", userRegistrationController);
router.get("/teams", getTeamsController);
router.get("/users", showUsersController);
router.get("/leagues", getLeaguesController);
router.get("/leagues/:id/matches", getLeagueMatchesById);
router.get("/leagues/:id/teams", getLeagueTeamsById);
router.get("/matches/:id", getMatchByIdController);
router.get("/matches", showMatchesController);
router.get("/leagues/:id/table", getLeagueTableController);
router.get("/leagues/:id", getLeagueById);

export default router;