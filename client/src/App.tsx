import "./App.css"
import CreateRoom from "./Components/CreateRoom.tsx";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Room from "./Pages/Room.tsx";

function App() {

  return (
    <>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/rooms/:id" element={<Room/>}/>
  </Routes>
    </>
  )
}

export default App
