import z from 'zod';

export const envSchema = z.object({
    DATABASE_URL: z.string().trim().min(1),
    PORT: z.coerce.number().int().positive().default(9090),
    JWT_SECRET: z.string().trim().min(20),
    CORS_ORIGIN: z.string().trim().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().trim().min(1),
    CLOUDINARY_API_KEY: z.string().trim().min(1),
    CLOUDINARY_API_SECRET: z.string().trim().min(1),
    GEMINI_API_KEY: z.string().trim().min(1),
});
