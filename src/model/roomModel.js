import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    users: {   // ✅ Store multiple users in an array
        type: [String], 
        required: true,
        default: [],  // ✅ Ensures an empty array is initialized
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Room", roomSchema);
