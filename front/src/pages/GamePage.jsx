import { useEffect, useState } from "react"
import Map from "../components/Map/Map"
import { useParams } from "react-router-dom";
import { API_URL } from "../config";


export default function GamePage() {
    const params = useParams();
    const matchIdd = params.id;
    const [info, setInfo] = useState("X делает первый пук");
    const [machData, setMachData] = useState();

    async function apiGetMach() {
        const url = API_URL + "/match/" + matchIdd
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        const result = await response.json()
        console.log(result);
        setMachData(result)
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