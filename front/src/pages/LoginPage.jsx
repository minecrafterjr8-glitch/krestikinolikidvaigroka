import { useEffect, useState } from "react"
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigator = useNavigate()
    const [isWaiting, setWaiting] = useState(false)

    async function joinHandler() {        
        const url = API_URL + "/players/ready"
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        setWaiting(true)
    }

    async function checkStatus() {
        const url = API_URL + "/player/status"
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        const result = await response.json()
        console.log(result);
        if (result.status == "в матче") {
            navigator(`/match/${result.match_id}`)
        }
    }

    useEffect(()=>{
        const interval = setInterval(checkStatus, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="loginPage">
                <button onClick={joinHandler} className="join-button">присоединиться</button>
                {isWaiting && <h1 className="info-heading">Пожалуйста подождите другого игрока.</h1>}
            </div>
        </>
    )
}