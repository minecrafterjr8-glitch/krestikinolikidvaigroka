import { useState } from "react"
import Map from "../components/Map/Map"



export default function GamePage() {
    const [info, setInfo] = useState("X делает первый ход")

    return (
        <>
            <div className="page">
                <p className="status">{info}</p>
                <Map setInfo={setInfo} />
            </div>
        </>
    )
}