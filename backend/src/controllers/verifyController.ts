import { Response } from 'express';
import { RequestWithJwtPayload } from '../middlewares';

const verifyController = async (req: RequestWithJwtPayload, res: Response) => {
    if(req.authPayload === undefined) {
        throw new Error('Use verifyTokenMiddleware');
    }
    res.status(200).json(req.authPayload);
};

export default verifyController;