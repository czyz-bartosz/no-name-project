import { Request, Response } from 'express';
import { RequestWithJwtPayload } from '../../middlewares';
import User from '../../models/User.js';

type EditProfileRequest = RequestWithJwtPayload & Request<{}, {}, User>;

const editProfileController = async (req: EditProfileRequest, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
    try {
        const userId = req.authPayload.id;
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
    
        if(!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
    
        await user.update(req.body as User);
        res.status(200).json('User updated');
    } catch (error) {
        const err = error as Error;
        res.status(400).json({error: err.message});
    }
};

export default editProfileController;