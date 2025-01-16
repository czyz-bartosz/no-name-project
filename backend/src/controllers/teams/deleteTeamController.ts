import { RequestWithJwtPayload } from "../../middlewares";
import { Response } from "express";
import Team from "../../models/Team.js";

type DeleteTeamRequestParams = {id: string};
type DeleteTeamRequest = RequestWithJwtPayload<DeleteTeamRequestParams, {}, {}>;

const deleteTeamController = async (req: DeleteTeamRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
     
    try {
        const teamId = req.params.id;
        const team = await Team.findByPk(teamId);
        if(team === null) {
            throw new Error('Team not found');
        }
        if(team.creatorUserId !== req.authPayload.id) {
            throw new Error('You can only delete teams that you created');
        }
        await team.update({isDeleted: true});
        res.status(204).send();
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default deleteTeamController;