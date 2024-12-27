import dotenv from "dotenv";

dotenv.config();
const port = parseInt(process.env.PORT || "4000");

const config : {
    port: number
} = {
    port
};

export default config;