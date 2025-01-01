import { RequestWithJwtPayload } from "../../middlewares";
import League from "../../models/League.js";
import Match from "../../models/Match.js";
import { Request, Response } from "express";

type editMatchControllerRequest = RequestWithJwtPayload & Request<{ id: number }, {}, Match>;

const editMatchController = async (req: editMatchControllerRequest, res: Response) => {
    if (!req.authPayload) {
        throw new Error('Use verifyTokenMiddleware');
    }

    const { id } = req.params;
    try {
        const match = await Match.findByPk(id);
        if (!match) {
            res.status(404).json({ error: "Match not found" });
            return;
        }

        const league = await League.findByPk(match.leagueId);

        if (!league) {
            res.status(404).json({ error: "League not found" });
            return;
        }

        if(league.creatorUserId !== req.authPayload.id && match.refereeUserId !== req.authPayload.id) {
            res.status(403).json({ error: "You are not authorized to edit this match" });
            return;
        }

        let allowedAttributes: (keyof Match)[] = [];

        if (league.creatorUserId === req.authPayload.id) {
            allowedAttributes = ["refereeUserId", "startDatetime"];
        }

        if (match.refereeUserId === req.authPayload.id) {
            allowedAttributes = ["homeTeamGoals", "awayTeamGoals", "isLive", "isOver", "startDatetime"];
        }
        
        const updates: Partial<Match> = {};

        for (const key of Object.keys(req.body)) {
            if (allowedAttributes.includes(key as keyof Match)) {
                updates[key as keyof Match] = req.body[key];
            }
        }

        await match.update(updates);
        res.status(200).json(match);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

const getMatchByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const match = await Match.findByPk(id);
        if (!match) {
            res.status(404).json({ error: "Match not found" });
            return;
        }
        res.status(200).json(match);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

const getMatchesForReferreController = async (req: RequestWithJwtPayload, res: Response) => {
    if (!req.authPayload) {
        throw new Error('Use verifyTokenMiddleware');
    }

    try {
        const matches = await Match.findAll({where: {refereeUserId: req.authPayload.id}});
        if (matches) {
            res.status(200).json(matches);
        } else {
            res.status(404).json({ error: "void" });
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export {editMatchController, getMatchByIdController, getMatchesForReferreController};