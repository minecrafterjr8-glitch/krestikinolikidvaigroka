
export default function WinnerLine ({ isDiagonal }) {
    return (
        <>
            <div className={`winner_line ${isDiagonal ? "winner_line--big" : ""}`}></div>
        </>
    )
}
