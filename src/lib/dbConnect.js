import mongoose from "mongoose";

const connectToDatabase = async () => {
    const MONGOURI = process.env.NODE_ENV === "development" 
        ? process.env.MONGO_LOCAL_URI 
        : process.env.MONGO_PROD_URI;

    if (!MONGOURI) {
        console.error("MongoDB URI is missing! Check your environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGOURI);

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectToDatabase;
