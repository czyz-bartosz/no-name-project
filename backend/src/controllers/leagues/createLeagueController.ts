import { Response } from 'express';
import League from '../../models/League.js';
import { RequestWithJwtPayload } from '../../middlewares/index.js';

type CreateLeagueRequestBody = Partial<League>;
type CreateLeagueRequest = RequestWithJwtPayload<{}, {}, CreateLeagueRequestBody>;

const createLeagueController = async (req: CreateLeagueRequest, res: Response) => {
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

export default createLeagueController;