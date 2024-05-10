import SocketIoClient from "socket.io-client";
import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Peer from "peerjs";
import {v4 as UUIDv4} from "uuid";

const ws = 'http://localhost:8000';

const socket = SocketIoClient(ws,{
    withCredentials: false,
    transports: ["polling", "websocket"]
});

export const SocketContext = createContext<any | null>(null);

interface props{
    children: React.ReactNode;
}

export const SocketProvider: React.FC<props> = ({children})=>{

    const navigate = useNavigate();
    const [user, setUser] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();

    const fetchParticipantList = ({roomid, participants}: {roomid: string, participants: string[]})=>{
        console.log(`participants in room ${roomid}are ${[participants]}`);
    } 

    const enterRoom = ({roomid}: {roomid: string})=>{
        navigate(`/rooms/${roomid}`);
    }

    const fetchUserFeed = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia(
            {video: true, audio:true}
        )
        setStream(stream);
    }

    useEffect(()=>{
        const userid = UUIDv4();
        const newpeer = new Peer(userid);
        setUser(newpeer);

        fetchUserFeed();

        socket.on("room-created", enterRoom);
     
        socket.on("get-users", fetchParticipantList);
    }, [])

    return (
        <SocketContext.Provider value={{socket, user, stream}}>
            {children}
        </SocketContext.Provider>
    )
}