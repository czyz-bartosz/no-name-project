import { RequestWithJwtPayload } from "../../middlewares";
import { Response, Request } from "express";
import Team from "../../models/Team.js";

type CreateTeamRequest = RequestWithJwtPayload & Request<{}, {}, Team>;

const createTeamController = async (req: CreateTeamRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
     
    try {
        const team = Team.build(req.body);
        team.creatorUserId = req.authPayload.id;
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default createTeamController;