import {useParams} from "react-router-dom"; 
import {useContext, useEffect} from "react";
import {SocketContext} from "../Context/SocketContext"

const Room: React.FC = ()=>{

    const {id} = useParams();
    const {socket, user} = useContext(SocketContext);

    useEffect(()=>{
        if(user) socket.emit("joined-room", {roomid:id, peerid: user._id});
    },[id, user, socket])
    return (
        <div>
            Rooom : {id}
        </div>
    )
}

export default Room;