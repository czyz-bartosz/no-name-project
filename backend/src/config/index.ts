import dotenv from "dotenv";

dotenv.config();

if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not provided');
}

if(!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not provided');
}

const PORT = parseInt(process.env.PORT || "4000");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_TOKEN_EXPIRATION = '1h';
const JWT_REFRESH_TOKEN_EXPIRATION = '7d';

const config : {
    PORT: number,
    JWT_SECRET: string,
    JWT_TOKEN_EXPIRATION: string,
    JWT_REFRESH_TOKEN_EXPIRATION: string,
    JWT_REFRESH_SECRET: string
} = {
    PORT,
    JWT_SECRET,
    JWT_TOKEN_EXPIRATION,
    JWT_REFRESH_TOKEN_EXPIRATION,
    JWT_REFRESH_SECRET
};

export default config;