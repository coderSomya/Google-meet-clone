import SocketIoClient from "socket.io-client";
import {createContext} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

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

    useEffect(()=>{

        const enterRoom = ({roomid}: {roomid: string})=>{
            navigate(`/rooms/${roomid}`);
        }
        socket.on("room-created", enterRoom)
    }, [])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}