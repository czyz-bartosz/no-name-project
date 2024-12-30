import dotenv from "dotenv";

dotenv.config();

if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not provided');
}

const PORT = parseInt(process.env.PORT || "4000");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_TOKEN_EXPIRATION = '1h';

const config : {
    PORT: number,
    JWT_SECRET: string,
    JWT_TOKEN_EXPIRATION: string
} = {
    PORT,
    JWT_SECRET,
    JWT_TOKEN_EXPIRATION
};

export default config;