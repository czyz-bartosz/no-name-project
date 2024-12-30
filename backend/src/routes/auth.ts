import { Router, Request, Response } from "express";
import { userLoginValidator, userLogin } from "../controllers/users/userLoginController.js";
import { userRegistrationController, userRegistrationValidator } from "../controllers/users/userRegistrationController.js";
import verifyController from "../controllers/verifyController.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Auth server!");
});
router.post("/login", userLoginValidator, userLogin);
router.post("/register", userRegistrationValidator, userRegistrationController);
router.get("/verify", verifyController);

export default router;