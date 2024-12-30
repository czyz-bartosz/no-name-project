import { Router, Request, Response } from "express";
import { userLoginValidator, userLogin } from "../../controllers/users/userLoginController.js";
import { userRegistrationController, userRegistrationValidator } from "../../controllers/users/userRegistrationController.js";
const router = Router();

router.post("/login", userLoginValidator, userLogin);
router.post("/register", userRegistrationValidator, userRegistrationController);

export default router;