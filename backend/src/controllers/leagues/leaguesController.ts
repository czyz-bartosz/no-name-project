import { Request, Response } from "express";
import League from "../../models/League.js";
import { RequestWithJwtPayload } from "../../middlewares/index.js";
import Team from "../../models/Team.js";
import TeamLeague from "../../models/TeamLeague.js";
import Match from "../../models/Match.js";
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

export const getMyLeaguesController = async (req: RequestWithJwtPayload, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
    try {
        const leagues = await League.findAll({where: { creatorUserId: req.authPayload.id }});
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

// Get a league by ID
export const getLeagueTeamsById = async (req: Request, res: Response) => {
    try {
        const teamsLeagues = await TeamLeague.findAll({
            where: { leaguesId: req.params.id },
            include: [{ model: Team, required: true }],
        }) as (TeamLeague & {Team: Team})[];

        const teams = teamsLeagues.map((teamLeague) => teamLeague.Team);

        if (teams) {
            res.status(200).json(teams);
        } else {
            res.status(404).json({ error: "void" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};


export const getLeagueMatchesById = async (req: Request, res: Response) => {
    try {
        const matches = await Match.findAll({where: { leagueId: req.params.id }});
        if (matches) {
            res.status(200).json(matches);
        } else {
            res.status(404).json({ error: "void" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const generateLeagueSchedule = async (req: RequestWithJwtPayload, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware')
    }
    try {
        const leagueId = req.params.id;
        const league = await League.findByPk(leagueId);
        if (!league) {
            res.status(404).json({ error: "League not found" });
            return;
        }
        if(league.creatorUserId !== req.authPayload.id) {
            res.status(403).json({ error: "You are not authorized to generate matches for this league" });
            return 
        }

        await Match.destroy({ where: { leagueId } });

        const teams: (TeamLeague | null)[] = await TeamLeague.findAll({ where: { leaguesId: leagueId }, attributes: ['teamsId'] });
        
        if (teams.length < 2) {
            res.status(400).json({ error: "Not enough teams to generate matches" });
            return;
        }

        const matches = [];

        if (teams.length % 2 !== 0) {
            teams.push(null); // Wirtualna drużyna
        }

        const startDate = new Date();
        const totalRounds = teams.length - 1;
        const matchesPerRound = teams.length / 2;

        let currentStartDate = new Date(startDate);

        for (let round = 0; round < totalRounds; round++) {
            for (let match = 0; match < matchesPerRound; match++) {
                const home = teams[match]?.teamsId;
                const away = teams[teams.length - 1 - match]?.teamsId;

                if (home !== undefined && away !== undefined) { // Pomijamy "pauzę"
                    matches.push({
                        homeTeamId: home,
                        awayTeamId: away,
                        leagueId: parseInt(leagueId),
                        startDatetime: new Date(currentStartDate), // Ustaw datę
                        refereeUserId: league.creatorUserId,
                        isLive: false,
                        isOver: false
                    });
                }
            }

            // Rotacja drużyn
            const lastTeam = teams.pop();
            if(lastTeam === undefined) {
                throw new Error('lastTeam is undefined');
            }
            teams.splice(1, 0, lastTeam);

            // Przesunięcie daty o tydzień
            currentStartDate.setDate(currentStartDate.getDate() + 7);
        }

        await Match.bulkCreate(matches);
        res.status(201).json({ message: "Matches generated successfully", matches });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

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
