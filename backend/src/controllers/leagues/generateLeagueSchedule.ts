import { RequestWithJwtPayload } from '../../middlewares/index.js';
import { Response } from 'express';
import League from '../../models/League.js';
import TeamLeague from '../../models/TeamLeague.js';
import Match from '../../models/Match.js';

type GenerateLeagueScheduleRequest = RequestWithJwtPayload<{ id: string }>;

const generateLeagueSchedule = async (req: GenerateLeagueScheduleRequest, res: Response) => {
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

export default generateLeagueSchedule;