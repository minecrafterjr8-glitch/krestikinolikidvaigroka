import { useState } from "react"
import Map from "./components/Map/Map"
import { useEffect } from "react"
import { API_URL } from "./config"

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
      <div className="page">
        <p className="status">{info}</p>
        <Map setInfo={setInfo} />
      </div>
    </>
  )
}

export default App
