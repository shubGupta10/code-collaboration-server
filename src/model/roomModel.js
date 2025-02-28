import mongoose, { mongo } from 'mongoose'


const roomSchema = new mongoose.Schema({
    roomId: {
        type: "String",
        required: true,
        unique: true,
    },
    userId: {
        type: "String",
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Room", roomSchema);