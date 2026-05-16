import { useEffect, useState } from "react"
import Map from "../components/Map/Map"



export default function GamePage() {
    const [info, setInfo] = useState("X делает первый ход")
    const [map, setMap] = useState([
        "", "", "",
        "", "", "",
        "", "", ""
    ]);

    async function checkStatus() {
        const url = API_URL + "/player/status"
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        const result = await response.json()
        console.log(result);
  
    }

    useEffect(()=>{
        const interval = setInterval(checkStatus, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="page">
                <p className="status">{info}</p>
                <Map setInfo={setInfo} map={map} setMap={setMap} />
            </div>
        </>
    )
}