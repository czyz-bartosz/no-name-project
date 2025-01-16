import { Request, Response } from 'express';
import League from '../../models/League.js';

type GetLeagueByIdRequest = Request<{ id: string }, any, any, any, {}>;

const getLeagueById = async (req: GetLeagueByIdRequest, res: Response) => {
    try {
        const { id } = req.params;
        const league = await League.findByPk(id);
    
        if (!league) {
            res.status(404).json({ error: 'League not found' });
            return;
        }
    
        res.status(200).json(league);
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
        return;
    }
};

export default getLeagueById;