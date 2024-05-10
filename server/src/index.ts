import express from "express";
import {Server} from "socket.io";
import http from "http";
import cors from "cors";

import ServerConfig from "./config/serverConfig";

const app = express();

app.use(cors());



// node server
const server = http.createServer(app);
server.listen(ServerConfig.PORT, ()=>{
    console.log(`Server is listening on ${ServerConfig.PORT}`);
});


// socket server
const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket)=>{
    console.log("new user connected");

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    });
});