import { Response, Request } from "express";
import User from "../../models/User.js";

const showUsersController = async (req: Request, res: Response) => {     
    try {
        const users = await User.findAll({attributes: ['id', 'name', 'surname', 'email']});
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ error: err.message });
    }
};

export default showUsersController;