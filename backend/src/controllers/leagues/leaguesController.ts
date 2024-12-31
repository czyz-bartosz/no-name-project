import { Request, Response } from "express";
import League from "../../models/League.js";
import { RequestWithJwtPayload } from "../../middlewares/index.js";
import Team from "../../models/Team.js";
import TeamLeague from "../../models/TeamLeague.js";

type CreateLeagueRequest = RequestWithJwtPayload & Request<{}, {}, League>;

// Create a new league
export const createLeagueController = async (req: CreateLeagueRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware')
    }

    try {
        const league = League.build(req.body);
        league.creatorUserId = req.authPayload.id;
        await league.save();
        res.status(201).json(league);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

// Get all leagues
export const getLeaguesController = async (req: Request, res: Response) => {
    try {
        const leagues = await League.findAll();
        res.status(200).json(leagues);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

type AddTeamToLeagueRequest = RequestWithJwtPayload & Request<{ id: number }, {}, { teamId: number }>;

// Add a team to a league
export const addTeamToLeague = async (req: AddTeamToLeagueRequest, res: Response) => {
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

// // Get a league by ID
// export const getLeagueById = async (req: Request, res: Response) => {
//     try {
//         const league = await League.findByPk(req.params.id);
//         if (league) {
//             res.status(200).json(league);
//         } else {
//             res.status(404).json({ error: "League not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update a league
// export const updateLeague = async (req: Request, res: Response) => {
//     try {
//         const [updated] = await League.update(req.body, {
//             where: { id: req.params.id },
//         });
//         if (updated) {
//             const updatedLeague = await League.findByPk(req.params.id);
//             res.status(200).json(updatedLeague);
//         } else {
//             res.status(404).json({ error: "League not found" });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delete a league
// export const deleteLeague = async (req: Request, res: Response) => {
//     try {
//         const deleted = await League.destroy({
//             where: { id: req.params.id },
//         });
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: "League not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
