import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import AuthJwtPayload from '../interfaces/AuthJwtPayload.js';

interface CustomRequest extends Request {
    authPayload: AuthJwtPayload;
}
  
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
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

        req.authPayload = decoded as AuthJwtPayload;

        next();
    } catch (err) {
        const error = err as Error;
        res.status(401).send(`Authentication failed: ${error.message}`);
    }
};

export { verifyToken };