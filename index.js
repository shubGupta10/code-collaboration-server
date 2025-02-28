import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import roomRouter from './src/routes/roomRoute.js';
import codeRouter from './src/routes/codeRoutes.js';
import {createServer} from 'http'
import { initializeSocket } from './src/socketConfig/socket.js';
import connectToDatabase from './src/lib/dbConnect.js';


dotenv.config();
const app = express()
const server = createServer(app);
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json())

app.use("/room", roomRouter);
app.use("/code", codeRouter);


app.get("/", (req, res) => {
    res.send("Express Server is running")
});

initializeSocket(server);
connectToDatabase();

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})