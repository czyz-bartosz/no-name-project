import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import config from '../../config.js';
import AuthJwtPayload from '../../interfaces/AuthJwtPayload.js';


type UserLoginBody = Pick<User, 'email' | 'password'>;

type UserLoginRequest = Request<{}, {}, UserLoginBody>;

const userLoginValidator = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];

const userLogin = async (req: UserLoginRequest, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

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
        
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again.' });
    }
};

export { userLoginValidator, userLogin };