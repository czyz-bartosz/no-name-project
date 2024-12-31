import { Router, Request, Response } from "express";
import { userLoginValidator, userLogin } from "../../controllers/users/userLoginController.js";
import { userRegistrationController } from "../../controllers/users/userRegistrationController.js";
const router = Router();

router.post("/login", userLogin);
router.post("/register", userRegistrationController);

export default router;