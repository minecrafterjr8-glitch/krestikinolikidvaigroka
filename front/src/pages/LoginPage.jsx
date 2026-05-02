import { useState } from "react"


export default function LoginPage() {
    const [isWaiting, setWaiting] = useState(false)
    function joinHandler() {
        setWaiting(true)
    }
    return (
        <>
            <div className="loginPage"><button onClick={joinHandler} className="join-button">присоединиться</button>
                {isWaiting && <h1 className="info-heading">Пожалуйста подождите другого игрока.</h1>}
                
            </div>
        </>
    )
}