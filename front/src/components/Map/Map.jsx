import { useState } from "react"
import WinnerLine from "../Line/Line";


export default function Map({ setInfo, map, setMap }) {


    const [isGameOver, setGameOver] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [dataLineWin, setDataLineWin] = useState()

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

    function clickCell(indexCell) {
        if (isGameOver) return
        let newMap = [...map]

        if (newMap[indexCell] != "") return

        // обновить поле
        newMap[indexCell] = currentPlayer
        setMap(newMap)

        // проверить победителя
        const winner = findWinner(newMap)
        if (winner) {
            setInfo("Победил " + winner.winner)
            setDataLineWin(winner)
            setGameOver(true)
            return
        }

        // проверка на ничью
        if (newMap.filter(cell => cell === "").length == 0) {
            setInfo("У вас ничья")
            setGameOver(true)
            return 
        }

        // обновить след. игрока (далее либо Х, либо О)
        if (currentPlayer == "X") {
            setCurrentPlayer("O")
        } else {
            setCurrentPlayer("X")
        }
    }

    return (
        <>
            <div className="map">
                { dataLineWin &&
                    <div className="wrap__winner_line" style={{
                        top: `${35 + 70 * dataLineWin.row}px`, 
                        left: `${35 + 70 * dataLineWin.column}px`,
                        rotate: `${dataLineWin.rotate}deg`
                    }}>
                        <WinnerLine isDiagonal={dataLineWin.isDiagonal} />
                    </div>
                }

                {map.map((cell, index) =>
                    <div key={index} className="cell" onClick={() => clickCell(index)}>{cell}</div>
                )}
            </div>
        </>
    )
}
