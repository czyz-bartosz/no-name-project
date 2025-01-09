import { Request, Response } from "express";
import League from "../../models/League.js";

const getLeaguesController = async (req: Request, res: Response) => {
    try {
        const leagues = await League.findAll();
        res.status(200).json(leagues);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export default getLeaguesController;