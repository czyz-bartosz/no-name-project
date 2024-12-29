import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const verifyController = async (req: Request, res: Response) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('Token not provided');
        }

        let decoded = jwt.verify(token, config.JWT_SECRET);

        if(typeof decoded === 'string') {
            throw new Error('Invalid token payload');
        }

        if(decoded.id === undefined) {
            throw new Error('Invalid token payload');
        }

        res.status(200).send('Token is valid');
    } catch (err) {
        const error = err as Error;
        res.status(401).send(`Authentication failed: ${error.message}`);
    }
};

export default verifyController;