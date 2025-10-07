import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;
export const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;
export const API_KEY = process.env.VITE_API_KEY
export const SECRET = process.env.SECRET;