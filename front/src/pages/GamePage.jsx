import { useEffect, useState } from "react"
import Map from "../components/Map/Map"
import { useParams } from "react-router-dom";
import { API_URL } from "../config";


export default function GamePage() {
    const params = useParams();
    const matchId = params.id;
    const [info, setInfo] = useState("X делает первый пук");
    const [matchData, setMatchData] = useState();

    async function apiGetMach() {
        const url = API_URL + "/match/" + matchId
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        const result = await response.json()
        console.log(result);
        setMatchData(result)
    }

    useEffect(()=>{
        const interval = setInterval(apiGetMach, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="page">
                <p className="status">{info}</p>
                {machData && <Map setInfo={setInfo} map={machData.map}/>}
            </div>
        </>
    )
}