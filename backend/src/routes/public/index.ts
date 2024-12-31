import { Router, Request, Response } from "express";
import { userLoginValidator, userLogin } from "../../controllers/users/userLoginController.js";
import { userRegistrationController } from "../../controllers/users/userRegistrationController.js";
import showTeamsController from "../../controllers/teams/showTeamController.js";
import showUsersController from "../../controllers/users/showUsersController.js";
import {getLeaguesController} from "../../controllers/leagues/leaguesController.js";
const router = Router();

router.post("/login", userLogin);
router.post("/register", userRegistrationController);
router.get("/teams", showTeamsController);
router.get("/users", showUsersController);
router.get("/leagues", getLeaguesController);

export default router;