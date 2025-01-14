import { Response } from 'express';
import { RequestWithJwtPayload } from '../../middlewares/index.js';
import League from '../../models/League.js';

const getMyLeaguesController = async (req: RequestWithJwtPayload, res: Response) => {
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

export default getMyLeaguesController;