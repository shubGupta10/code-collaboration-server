import express from 'express'
import { createRoom, deleteRoom, getRoomDetails, joinRoom, leaveRoom } from '../controller/roomController.js'

const roomRouter = express.Router()

roomRouter.post("/create-room", createRoom);
roomRouter.post("/join-room/:roomId", joinRoom);
roomRouter.get("/get-room-details/:roomId", getRoomDetails);
roomRouter.post("/leave-room/:roomId", leaveRoom);
roomRouter.delete("delete-room/:roomId", deleteRoom);

export default roomRouter;