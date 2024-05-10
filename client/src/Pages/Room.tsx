import {useParams} from "react-router-dom"; 
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../Context/SocketContext"
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = ()=>{

    const {id} = useParams();
    const {socket, user, stream, peers} = useContext(SocketContext);



    useEffect(()=>{
        if(user) {
            socket.emit("joined-room", {roomid:id, peerid: user._id});

        }
        console.log(peers);
    },[id, user, socket])
    return (
        <div>
        <div>
            <h1>Rooom : {id}</h1>
            Your feed
            <UserFeedPlayer stream={stream}/>
        </div>

        <div>
            other people feed
            {
                peers && Object.keys(peers).map((peerid)=>{
                    return(
                        <UserFeedPlayer key={peerid} stream={peers[peerid].stream}/>
                    )
                })
            }
        </div>
        </div>
    )
}

export default Room;