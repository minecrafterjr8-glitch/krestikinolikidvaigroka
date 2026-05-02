import { useState } from "react"
import Map from "./components/Map/Map"
import { useEffect } from "react"
import { API_URL } from "./config"
import LoginPage from "../../../tik-tak-toe - online - fullstack/front/src/pages/LoginPage"
import GamePage from "../../../tik-tak-toe - online - fullstack/front/src/pages/GamePage"
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  const [info, setInfo] = useState("X делает первый ход")

  async function register() {
    const url = API_URL + "/auth/register"
    const response = await fetch(url);
    const uuid = await response.text()
    localStorage.setItem("uuid", uuid)
  } 

  useEffect(()=>{
    register()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/match" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
