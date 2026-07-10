import express from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/";

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        const connectionDb = await mongoose.connect(MONGO_URI)
        console.log(`Mongo connected, DB host: ${connectionDb.connection.host}`)

        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`)
        });
    } catch (e) {
        console.error("Failed to start server:", e);
        process.exit(1);
    }
}

start();
