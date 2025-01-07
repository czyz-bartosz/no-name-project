import { Request, Response } from "express";
import Match from "../../models/Match.js";

type GetLeagueMatchesByIdRequest = Request<{ id: string }, any, any, any>;

const getLeagueMatchesById = async (req: GetLeagueMatchesByIdRequest, res: Response) => {
    try {
        const matches = await Match.findAll({where: { leagueId: req.params.id }});
        
        res.status(200).json(matches);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export default getLeagueMatchesById;