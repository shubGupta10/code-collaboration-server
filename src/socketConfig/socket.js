import { Server } from 'socket.io';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected successfully ${socket.id}`);

        // Handling joining a room
        socket.on("joinroom", ({ roomId, userId }) => {
            if (!roomId || !userId) return; 
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
            io.to(roomId).emit("UserJoined", { userId });
        });

        // Handle real-time code updates
        socket.on("codeChange", ({ roomId, code }) => {
            if (!roomId) return;
            console.log(`Code update in room ${roomId}`);
            socket.to(roomId).emit("codeUpdate", { code });
        });

        // Handle user leaving
        socket.on("leaveRoom", ({ roomId, userId }) => {
            if (!roomId || !userId) return;
            socket.leave(roomId);
            console.log(`User ${userId} left room ${roomId}`);
            io.to(roomId).emit("userLeft", { userId });
        });

        // Handle client disconnecting
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

export const getIO = () => io;
