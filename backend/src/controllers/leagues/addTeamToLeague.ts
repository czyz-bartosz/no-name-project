import { Response } from "express";
import League from "../../models/League.js";
import { RequestWithJwtPayload } from "../../middlewares/index.js";
import Team from "../../models/Team.js";
import TeamLeague from "../../models/TeamLeague.js";

type AddTeamToLeagueRequest = RequestWithJwtPayload<{ id: string }, {}, { teamId?: string }>;

const addTeamToLeague = async (req: AddTeamToLeagueRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware')
    }

    const { id: leagueId } = req.params;
    const { teamId } = req.body;
    
    try {
        const league = await League.findByPk(leagueId);
        if (!league) {
            res.status(404).json({ error: "League not found" });
            return;
        }

        if(league.creatorUserId !== req.authPayload.id) {
            res.status(403).json({ error: "You are not authorized to add teams to this league" });
            return 
        }

        if (!teamId) {
            res.status(400).json({ error: "teamId is required" });
            return;
        }

        const team = await Team.findByPk(teamId);
        
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }

        await TeamLeague.create({ leaguesId: leagueId, teamsId: teamId });
        res.status(200).json({ message: "Team added to league successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};


export default addTeamToLeague;