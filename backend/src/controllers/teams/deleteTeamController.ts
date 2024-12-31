import { RequestWithJwtPayload } from "../../middlewares";
import { Response, Request } from "express";
import Team from "../../models/Team.js";

type DeleteTeamRequest = RequestWithJwtPayload & Request<Pick<Team, 'id'>, {}, {}>;

const deleteTeamController = async (req: DeleteTeamRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
     
    try {
        if(req.params.id === undefined) {
            throw new Error('Team id is required');
        }

        if(isNaN(Number(req.params.id))) {
            throw new Error('Team id must be a number');
        }

        const teamId = Number(req.params.id);
        const team = await Team.findByPk(teamId);
        if(team === null) {
            throw new Error('Team not found');
        }
        if(team.creatorUserId !== req.authPayload.id) {
            throw new Error('You can only delete teams that you created');
        }
        await team.destroy();
        res.status(204).send();
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default deleteTeamController;