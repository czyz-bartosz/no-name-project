import { RequestWithJwtPayload } from "../../middlewares";
import { Response } from "express";
import Team from "../../models/Team.js";
import fs from 'fs/promises';
import path from 'path';

type CreateTeamRequestBody = Partial<Team> & { base64Logo?: string };
type CreateTeamRequest = RequestWithJwtPayload<{}, {}, CreateTeamRequestBody>;

const createTeamController = async (req: CreateTeamRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
     
    try {
        const team = Team.build(req.body);
        team.creatorUserId = req.authPayload.id;

        const base64Image = req.body.base64Logo;
        let extension: string | undefined;
        let buffer: Buffer | undefined;
        if (base64Image) {
            const matches = base64Image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
        
            if (!matches || matches.length !== 3) {
                throw new Error('Invalid base64 image format');
            }

            extension = matches[1];
            const imageData = matches[2];
            const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    
            if (!allowedExtensions.includes(extension.toLowerCase())) {
                throw new Error('Invalid image extension');
            }
    
            buffer = Buffer.from(imageData, 'base64');
        }

        await team.save();
        res.status(201).json(team);

        if (!buffer) {
            return;
        }
        const filePath = path.join('public', 'teams', 'logos', `${team.id}.${extension}`);
        team.logoUrl = `/public/teams/logos/${team.id}.${extension}`;
        team.save();
        await fs.writeFile(filePath, buffer);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default createTeamController;