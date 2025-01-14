import { Request, Response } from "express";
import League from "../../models/League.js";

type GetLeagueTableControllerRequest = Request<{id: string}, {}, {}>;

const getLeagueTableController = async (req: GetLeagueTableControllerRequest, res: Response) => {
    const leagueId = req.params.id;
    const league = await League.findByPk(leagueId);

    if (!league) {
        res.status(404).json({ error: 'League not found' });
        return;
    }

    const table = await league.getTable();

    res.json(table);
};

export default getLeagueTableController;