import SocketIoClient from "socket.io-client";
import {createContext} from "react";

const ws = 'http://localhost:8000';

const socket = SocketIoClient(ws);

const SocketContext = createContext<any | null>(null);

interface props{
    children: React.ReactNode;
}

export const SocketProvider: React.FC<props> = ({children})=>{
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}