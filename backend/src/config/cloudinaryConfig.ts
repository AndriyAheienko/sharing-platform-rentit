import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import { env } from './env';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (_req, file) => {
        if (file.fieldname === 'avatar') {
            return {
                folder: 'sharing_platform_avatars',
                allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
                transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face' }],
            };
        }

        return {
            folder: 'sharing_platform_items',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            transformation: [{ width: 800, height: 600, crop: 'limit' }],
        };
    },
});

export const upload = multer({ storage: storage });
