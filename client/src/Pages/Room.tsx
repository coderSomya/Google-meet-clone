import {useParams} from "react-router-dom"; 
import {useContext, useEffect} from "react";
import {SocketContext} from "../Context/SocketContext"

const Room: React.FC = ()=>{

    const {id} = useParams();
    const {socket} = useContext(SocketContext);

    useEffect(()=>{
        socket.emit("joined-room", {roomid:id});
    },[])
    return (
        <div>
            Rooom : {id}
        </div>
    )
}

export default Room;