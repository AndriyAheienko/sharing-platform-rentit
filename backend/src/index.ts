import express, { type Response, type Request } from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './models/initDB';

import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import bookingRoutes from './routes/bookingRoutes';
import userRoutes from './routes/userRoutes';
import chatAiRoutes from './routes/chatAiRoutes';
import chatRoutes from './routes/chatRoutes';
import { chatHandler } from './sockets/chatHandler';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:5173', 'https://aheienko-sharing-platform.vercel.app'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

initDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api', chatAiRoutes);
app.use('/api', chatRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'Роут не знайденно',
    });
});

app.use(errorHandler);

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173', 'https://aheienko-sharing-platform.vercel.app'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

chatHandler(io);

app.get('/', (res: Response) => {
    res.send('Сервер RentIt успішно запущено на TypeScript!');
});

httpServer.listen(port, () => {
    console.log(`🚀 Сервер працює на http://localhost:${port}`);
});
