import { Router } from "express";
import {editMatchController} from "../../controllers/matches/matchesController.js";
const router = Router();

router
    .patch("/:id", editMatchController);
    
export default router;