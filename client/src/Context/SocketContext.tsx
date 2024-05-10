import SocketIoClient from "socket.io-client";
import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useReducer} from "react";
import Peer from "peerjs";
import {v4 as UUIDv4} from "uuid";
import {peerReducer} from "../Reducers/peerReducer.ts";
import {addPeerAction} from "../Actions/peerAction.ts";

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

    const [peers, dispatch] = useReducer(peerReducer, {});

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
        const newpeer = new Peer(userid, {
            host: 'localhost',
            port: 9000,
        });
        setUser(newpeer);

        fetchUserFeed();

        socket.on("room-created", enterRoom);
     
        socket.on("get-users", fetchParticipantList);
    }, [])


    useEffect(()=>{
        if(!user || !stream) return;
    
        socket.on("user-joined", ({peerid})=>{
            const call = user.call(peerid, stream);
            call.on("stream", ()=>{
                dispatch(addPeerAction(peerid, stream));
           })
        }) 
    

        user.on("call", (call)=>{
            call.answer(stream);
            call.on("stream", ()=>{
                dispatch(addPeerAction(call.peer, stream));
            })
        })


        socket.emit("ready");
    }, [user, stream])
    return (
        <SocketContext.Provider value={{socket, user, stream, peers}}>
            {children}
        </SocketContext.Provider>
    )
}