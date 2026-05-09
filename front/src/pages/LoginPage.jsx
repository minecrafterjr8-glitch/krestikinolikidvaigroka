import { useState } from "react"
import { API_URL } from "../config";

export default function LoginPage() {
    const [isWaiting, setWaiting] = useState(false)

    async function joinHandler() {
        console.log("отправил зарпос");
        
        const url = API_URL + "/players/ready"
        const response = await fetch(url, {headers: {authorisation: localStorage.getItem("uuid")}});
        console.log(response);
        
        setWaiting(true)
    }
    return (
        <>
            <div className="loginPage">
                <button onClick={joinHandler} className="join-button">присоединиться</button>
                {isWaiting && <h1 className="info-heading">Пожалуйста подождите другого игрока.</h1>}
            </div>
        </>
    )
}