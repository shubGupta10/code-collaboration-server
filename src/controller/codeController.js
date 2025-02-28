import redis from '../redis/redis.js';
import {getIO} from '../socketConfig/socket.js'

export const updateCode = async (req, res) => {
    try {
        const {roomId, code} = req.body;
        if(!roomId || !code){
            return res.status(400).json({error: "Room ID and code are required"})
        }

        console.log(`Updating code for room ${roomId}`);

        //use redis for storing latest code
        await redis.setex(`code:${roomId}`, 3600, code)

        getIO().to(roomId).emit("codeUpdate", {code});
        res.status(200).json({
            message: "Code update broadcasted successfully"
        })
    } catch (error) {
        console.error("Error updating code", error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getCode = async (req, res) => {
    try {
        const {roomId} = req.params;
        if(!roomId){
            return res.status(400).json({
                error: "Room ID is required"
            })
        }
        //get the latest code from redis
        const code = await redis.get(`code:${roomId}`)
        return res.status(200).json({
            roomId, code: code || "Start coding here..."
        })
    } catch (error) {
        console.error("Error fetching code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}