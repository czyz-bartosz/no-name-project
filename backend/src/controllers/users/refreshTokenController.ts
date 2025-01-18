import config from '../../config/index.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthJwtPayload from '../../interfaces/AuthJwtPayload.js';
import ms from 'ms';

interface RefreshTokenControllerRequest extends Request {
    cookies: {
        refreshToken?: string;
    };
};

const refreshTokenController = async (req: RefreshTokenControllerRequest, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).send('Unauthorized');
        return;
    }

    jwt.verify(refreshToken, config.JWT_REFRESH_SECRET, (err, user) => {
        try {
            if (err) {
                res.status(403).send('Forbidden');
                return;
            }
            if(user === undefined) {
                throw new Error('Invalid token payload');
            }

            if(typeof user === 'string') {
                throw new Error('Invalid token payload');
            }

            if(user.id === undefined) {
                throw new Error('Invalid token payload');
            }

            const authPayload: AuthJwtPayload = {
                id: user.id
            };

            const token = jwt.sign(authPayload, config.JWT_SECRET, {
                expiresIn: config.JWT_TOKEN_EXPIRATION,
            });

            const refreshToken = jwt.sign(authPayload, config.JWT_REFRESH_SECRET, {
                expiresIn: config.JWT_REFRESH_TOKEN_EXPIRATION,
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: ms(config.JWT_REFRESH_TOKEN_EXPIRATION),
            });

            res.status(200).json({ token });
        }catch(error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    });
};

export default refreshTokenController;