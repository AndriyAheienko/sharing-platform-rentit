import type { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { saveMessages } from '../controllers/chatController';

export const chatHandler = (io: Server) => {
    let onlineUsers: { userId: number; socketId: string }[] = [];

    const addNewUser = (userId: number, socketId: string) => {
        const userIndex = onlineUsers.findIndex(user => user.userId === userId);

        if (userIndex !== -1) {
            onlineUsers[userIndex].socketId = socketId;
        } else {
            onlineUsers.push({ userId, socketId });
        }
    };

    const removeUser = (socketId: string) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    };

    io.on('connection', socket => {
        console.log(`Клієнт підключився: ${socket.id}`);

        socket.on('user_connected', (userId: number) => {
            addNewUser(userId, socket.id);

            const onlineUsersIds = onlineUsers.map(user => user.userId);
            io.emit('update_online_users', onlineUsersIds);
        });

        socket.on('disconnect', () => {
            removeUser(socket.id);

            const onlineUsersIds = onlineUsers.map(user => user.userId);
            io.emit('update_online_users', onlineUsersIds);
        });

        socket.on('join_chat', chatId => {
            socket.join(chatId.toString());
        });

        socket.on('send_message', saveMessages);
    });
};
