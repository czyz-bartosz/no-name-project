import { JwtPayload } from 'jsonwebtoken';

export default interface AuthJwtPayload extends JwtPayload {
    id: number;
};