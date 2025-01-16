import { Request, Response } from 'express';
import { RequestWithJwtPayload } from '../../middlewares';
import League from '../../models/League.js';

type DeleteLeagueControllerRequest = RequestWithJwtPayload<{ id: string }, {}, {}>;

const deleteLeagueController = async (req: DeleteLeagueControllerRequest, res: Response) => {
    try {
        if (!req.authPayload) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const league = await League.findByPk(id);
        if (!league) {
            res.status(404).json({ error: 'League not found' });
            return;
        }

        if (league.creatorUserId !== req.authPayload.id) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        await league.update({isDeleted: true});
        res.status(204).end();
        return;
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
        return;
    }
};

export default deleteLeagueController;