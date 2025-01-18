import { Response } from "express";
import Team from "../../models/Team.js";
import { RequestWithJwtPayload } from "../../middlewares/index.js";

const getMyTeamsController = async (req: RequestWithJwtPayload, res: Response) => {     
    if (!req.authPayload) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        const teams = await Team.findAll({where: {creatorUserId: req.authPayload.id, isDeleted: false}});
        res.status(200).json(teams);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default getMyTeamsController;