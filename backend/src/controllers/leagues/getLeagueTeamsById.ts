import { Request, Response } from "express";
import Team from "../../models/Team.js";
import TeamLeague from "../../models/TeamLeague.js";

type GetLeagueMatchesByIdRequest = Request<{ id: string }, {}, {}>;

const getLeagueTeamsById = async (req: GetLeagueMatchesByIdRequest, res: Response) => {
    try {
        const teamsLeagues = await TeamLeague.findAll({
            where: { leaguesId: req.params.id },
            include: [{ model: Team, required: true }],
        }) as (TeamLeague & {Team: Team})[];

        const teams = teamsLeagues.map((teamLeague) => teamLeague.Team);

        res.status(200).json(teams);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export default getLeagueTeamsById;