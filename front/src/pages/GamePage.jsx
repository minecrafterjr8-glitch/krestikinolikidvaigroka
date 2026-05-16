import { useEffect, useState } from "react"
import Map from "../components/Map/Map"
import { useParams } from "react-router-dom";
import { API_URL } from "../config";


export default function GamePage() {
    const params = useParams();
    const matchId = params.id;
    const [isGameOver, setGameOver] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [info, setInfo] = useState("X делает первый пук");
    const [matchData, setMatchData] = useState();

    async function apiGetMach() {
        const url = API_URL + "/match/" + matchId
        const response = await fetch(url, { headers: { authorisation: localStorage.getItem("uuid") } });
        const result = await response.json()
        console.log(result);
        setMatchData(result)
    }

    function findWinner(map) {
        // Проверка горизонталей
        for (let i of [0, 3, 6]) {
            if (map[i] && map[i] === map[i + 1] && map[i] === map[i + 2]) {
                return {
                    winner: map[i],
                    row: i / 3, // 0, 1, 2
                    column: 0,
                    rotate: 0,
                    isDiagonal: false
                };
            }
        }

        // Проверка вертикалей
        for (let i of [0, 1, 2]) {
            if (map[i] && map[i] === map[i + 3] && map[i] === map[i + 6]) {
                return {
                    winner: map[i],
                    row: 0,
                    column: i,
                    rotate: 90,
                    isDiagonal: false
                };
            }
        }

        // Проверка диагоналей
        if (map[0] && map[0] === map[4] && map[0] === map[8]) {
            return {
                winner: map[0],
                row: 0,
                column: 0,
                rotate: 45,
                isDiagonal: true
            };
        }
        if (map[2] && map[2] === map[4] && map[2] === map[6]) {
            return {
                winner: map[2],
                row: 0,
                column: 2,
                rotate: 135,
                isDiagonal: true
            };
        }

        // Нет победителя
        return null;
    }

    async function clickCell(indexCell) {
        if (isGameOver) return

        const map = [...matchData.map]
        if (map[indexCell] != "") return

        // ход
        const url = API_URL + `/match/${matchId}/move`
        const response = await fetch(url, {
            method: "post",
            headers: {
                authorisation: localStorage.getItem("uuid"),
                'Content-Type': 'application/json', // Inform server about the data format
                'Accept': 'application/json'        // Tell server to send back JSON
            },
            body: JSON.stringify({ index_cell: indexCell })
        });
        const result = await response.json()
        console.log(result)

        // проверить победителя
        // const winner = findWinner(newMap)
        // if (winner) {
        //     setInfo("Победил " + winner.winner)
        //     setDataLineWin(winner)
        //     setGameOver(true)
        //     return
        // }

        // // проверка на ничью
        // if (newMap.filter(cell => cell === "").length == 0) {
        //     setInfo("У вас ничья")
        //     setGameOver(true)
        //     return
        // }

        // // обновить след. игрока (далее либо Х, либо О)
        // if (currentPlayer == "X") {
        //     setCurrentPlayer("O")
        // } else {
        //     setCurrentPlayer("X")
        // }
    }

    useEffect(() => {
        const interval = setInterval(apiGetMach, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="page">
                <p className="status">{info}</p>
                {matchData && <Map setInfo={setInfo} map={matchData.map} clickCell={clickCell} />}
            </div>
        </>
    )
}