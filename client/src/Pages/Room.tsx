import {useParams} from "react-router-dom"; 
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../Context/SocketContext"

const Room: React.FC = ()=>{

    const {id} = useParams();
    const {socket, user} = useContext(SocketContext);



    useEffect(()=>{
        if(user) {
            socket.emit("joined-room", {roomid:id, peerid: user._id});

        }

    },[id, user, socket])
    return (
        <div>
            <h1>Rooom : {id}</h1>
        </div>
    )
}

export default Room;