import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 7000,
};