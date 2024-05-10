import {Socket} from "socket.io";
import {v4 as UUIDv4} from "uuid";

const roomHandler = (socket: Socket) =>{

    const createRoom = ()=>{
        const roomid = UUIDv4();
        console.log("room created with id..", roomid);
        socket.join(roomid);
        socket.emit("room-created", {roomid});
    };

    const joinedRoom = ({roomid}: {roomid: string})=>{
        console.log("new user joined room",{roomid}, "with id", socket.id);
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);


};

export default roomHandler;