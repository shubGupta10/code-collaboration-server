import roomModel from "../model/roomModel.js";

export const createRoom = async (req, res) => {
    try {
        const { roomId, userId } = req.body; 

        if (!roomId || !userId) {
            return res.status(400).json({ error: "Room Id and UserId are required" });
        }

        let room = await roomModel.findOne({ roomId });

        if (!room) {
            room = new roomModel({ roomId, users: [userId] });
            await room.save();
        } else {
            if (!room.users.includes(userId)) {
                room.users.push(userId);
                await room.save();
            }
        }

        return res.status(200).json({ message: "Room created/joined successfully.", room });
    } catch (error) {
        console.error("Error in createRoom:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const joinRoom = async (req, res) => {
    try {
        // const {roomId} = await req.params;
        const {userId, roomId} =  req.body;

        if(!roomId || !userId){
            return res.status(400).json({
                error: "RoomId and UserId needed"
            })
        }

        let room = await roomModel.findOne({roomId})
        if(!room){
            return res.status(404).json({
                error: "Room not found"
            })
        }

        if(room.users.includes(userId)){
            return res.status(400).json({
                error: "User is already in the room"
            })
        }

        room.users.push(userId); 
        await room.save();

        return res.status(200).json({
            message: "Joined room successfully", room
        })
    } catch (error) {
        console.error("Error joining room:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const getRoomDetails = async (req, res) => {
    try {
        const {roomId} = req.params;
        if(!params){
            return res.status(400).json({
                error: "Room id is required"
            })
        }

        const room = await roomModel.findOne({roomId})
        if(!room){
            return res.status(404).json({
                error: "Room not found"
            })
        }
        return res.status(200).json({
            roomId: room.roomId,
            users: room.users,
            activeUsers: room.users.length,
            createdAt: room.createdAt
        })
    } catch (error) {
        console.error("Error fetching room details:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const leaveRoom = async (req, res) => {
    try {
        const {userId} = req.body;
        const {roomId} = req.params;

        if(!userId || !roomId){
            return res.status(400).json({
                error: "Room and User ID are required"
            })
        }

        const room = await roomModel.findOne({roomId})
        if(!room){
            return res.status(404).json({
                message: "Room not found"
            })
        }

        room.users = room.users.filters(id => id !== userId);
        await room.save();

        //delete the room if empty
        if(room.users.length === 0){
            await roomModel.deleteOne({roomId})
            return res.status(200).json({
              message:  "Room deleted as it was empty"
        })
        }

        return res.status(200).json({
            message: "User left the room", room
        })
    } catch (error) {
        console.error("Error leaving room:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const deleteRoom =  async (req, res) => {
    try {
        const {roomId} = req.params;
        if(!roomId){
            return res.status(400).json({
                error: "Room is required"
            })
        }

        const room =  await roomModel.findOne({roomId})
        if(!room){
            return res.status(404).json({
                error: "Room not found"
            })
        }

        if(room.users.length === 0){
            await roomModel.deleteOne({roomId})
            return res.status(200).json({
                message: "Room deleted successfully"
            })
        }else{
            return res.status(403).json({
                error: "Room is not empty, force delete required"
            })
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}