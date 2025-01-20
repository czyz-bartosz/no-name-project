import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import config from '../../config/index.js';
import AuthJwtPayload from '../../interfaces/AuthJwtPayload.js';
import ms from 'ms';

type UserLoginBody = Pick<User, 'email' | 'password'>;

type UserLoginRequest = Request<{}, {}, UserLoginBody>;

const userLoginValidator = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

const userLogin = async (req: UserLoginRequest, res: Response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ 
            where: { email },
            attributes: ['id', 'password']
        });

        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
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
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export { userLoginValidator, userLogin };