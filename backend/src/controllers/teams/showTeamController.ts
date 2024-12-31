import { Response, Request } from "express";
import Team from "../../models/Team.js";

const showTeamsController = async (req: Request, res: Response) => {     
    try {
        const teams = await Team.findAll();
        res.status(200).json(teams);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default showTeamsController;