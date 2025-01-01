import { Router } from "express";
import { getMatchesForReferreController } from "../../controllers/matches/matchesController.js";
const router = Router();

router
    .get("/matches", getMatchesForReferreController)
    
export default router;