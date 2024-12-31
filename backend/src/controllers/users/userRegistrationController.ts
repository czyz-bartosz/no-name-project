import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../../models/User.js';

type UserRegistrationBody = Pick<User, 'email' | 'password' | 'name' | 'surname'>;
type UserRegistrationRequest = Request<{}, {}, UserRegistrationBody>;

// const userRegistrationValidator = [
//     body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('name').notEmpty().withMessage('Name is required'),
//     body('surname').notEmpty().withMessage('Surname is required')
// ];

const userRegistrationController = async (req: UserRegistrationRequest, res: Response) => {
    try {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     res.status(400).json({ errors: errors.array() });
        //     return;
        // }

        const { email, password, name, surname } = req.body;

        const isRegistered  = await User.count({ 
            where: { email }
        });

        if (isRegistered) {
            res.status(400).json({ message: 'You are already registered' });
            return;
        }

        const user = await User.create({ email, password, name, surname });
        res.status(201).json({ id: user.id });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export { userRegistrationController };