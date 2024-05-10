import {Socket} from "socket.io";
import {v4 as UUIDv4} from "uuid";
import IRoomParams from "../interfaces/IRoomParams"

const rooms : Record<string, string[]> = {};

const roomHandler = (socket: Socket) =>{

    const createRoom = ()=>{
        const roomid = UUIDv4();
        console.log("room created with id..", roomid);
        socket.join(roomid);
        socket.emit("room-created", {roomid});
        rooms[roomid] = [];
    };

    const joinedRoom = ({roomid, peerid}: IRoomParams)=>{
        if(rooms[roomid]){
            rooms[roomid].push(peerid);
            console.log("new user joined room",roomid, "with id", peerid);
            socket.join(roomid);
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);


};

export default roomHandler;