import CreateRoom from "../Components/CreateRoom.tsx";


const Home: React.FC = ()=>{
    return(
        <div className="h-[100vh] flex justify-center items-center">
            <CreateRoom/>
        </div>
    )
}


export default Home;