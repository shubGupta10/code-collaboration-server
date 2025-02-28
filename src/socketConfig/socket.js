import {Server} from 'socket.io'

let io;

export const  initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log(`User connected successfully ${socket.id}`);
        
        //handling joining a room
        socket.on("joinroom", ({roomId, userId}) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
            io.to(roomId).emit("UserJoined", {userId})
        })

        //handle real time code updates
        socket.on("codeChange", ({roomId, code}) => {
            console.log(`Code update in room ${roomId}`);
            socket.to(roomId).emit("codeUpdate", {code})
        })

        //handle user leaving
        socket.on("leaveRoom", ({roomId, userId}) => {
            socket.leave(roomId);
            console.log(`User ${userId} left room ${roomId}`);
            io.to(roomId).emit("userLeft", {userId})
        })

        //handle client disconnecting
        socket.on("disconnected", ()=> {
            console.log(`User disconnected: ${socket.id}`);
            
        })
    })
}

export const getIO = () => io;