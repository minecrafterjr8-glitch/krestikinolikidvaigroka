import { useState } from "react"
import WinnerLine from "../Line/Line";


export default function Map({ setInfo, map, clickCell }) {
    const [dataLineWin, setDataLineWin] = useState()

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
