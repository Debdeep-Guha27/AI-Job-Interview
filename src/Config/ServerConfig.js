import dotenv from 'dotenv';

dotenv.config();

export const db_url = process.env.DB_URL;
export const jwt_secret_key = process.env.JWT_SECRET;
export const key = process.env.GITHUB_GPT_4O;