import {useContext} from "react"; 
import {SocketContext} from "../Context/SocketContext";

const CreateRoom : React.FC = ()=>{

    const {socket} = useContext(SocketContext);

    const initRoom = ()=>{
        socket.emit("create-room");
    }
    return(
        <>
        <button onClick={initRoom}
        className="btn btn-secondary">
            Start a new meeting
        </button>
        </>
    )
}

export default CreateRoom;