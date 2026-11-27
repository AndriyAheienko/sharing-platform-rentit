import 'dotenv/config';
import { envSchema } from '../schema/env.schema';

const parsedEnv = envSchema.parse(process.env);

export const env = {
    DATABASE_URL: parsedEnv.DATABASE_URL,
    PORT: parsedEnv.PORT,
    JWT_SECRET: parsedEnv.JWT_SECRET,
    CORS_ORIGIN: parsedEnv.CORS_ORIGIN,
    CLOUDINARY_CLOUD_NAME: parsedEnv.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: parsedEnv.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: parsedEnv.CLOUDINARY_API_SECRET,
    GEMINI_API_KEY: parsedEnv.GEMINI_API_KEY,
};
