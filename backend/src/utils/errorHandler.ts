import { Response } from 'express';

export const handleError = (error: unknown, res: Response, errorText: string): void => {
    if (error instanceof Error) {
        console.error(`Помилка при ${errorText}:`, error);
    } else {
        console.error('Невідома помилка:', error);
    }

    res.status(500).json({ message: `Помилка сервера при ${errorText}` });
};
