import { Request, Response } from 'express';
import Team from '../../models/Team.js';

type GetTeamByIdControllerRequest = Request<{ id: string }, any, any, any, {}>;

const getTeamByIdController = async (req: GetTeamByIdControllerRequest, res: Response) => {
    try {
        const teamId = req.params.id;
        const team = await Team.findByPk(teamId);

        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default getTeamByIdController;