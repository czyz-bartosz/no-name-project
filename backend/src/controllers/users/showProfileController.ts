import { Response } from 'express';
import { RequestWithJwtPayload } from '../../middlewares';
import User from '../../models/User.js';

const showProfileController = async (req: RequestWithJwtPayload, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
    const userId = req.authPayload.id;
    const user = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['name', 'surname', 'email']
    });

    if(!user) {
        res.status(404).json({
            message: 'User not found'
        });
        return;
    }

    res.status(200).json(user);
};

export default showProfileController;