import Square from "./Square";
import React, {useEffect, useState, useRef} from "react";

export default function Board({ playerOne, playerTwo , calculateWin}) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [winner, setWinner] = useState(false);
    const [winningLine, setWinningLine] = useState([true]);
    const [winData, setWinData] = useState({  player:"", shape: "", time: ""});
    const [time, setTime] = useState("0:00");
    const [showWinMessage, setShowWinMessage] = useState(false);
    const intervalID = useRef(null);
    const equals = "Equals";


    const handleClick = (index) => {
        if (squares[index] !== null || winner) {
            return;
        }

        const newSquares = squares.slice();
        newSquares[index] = isNext ? "X" : "O";
        let playerTurn = newSquares[index] === "X" ? playerOne : playerTwo;

        const result = calculateWin(newSquares);
        if (result.winner) {
            setWinner(true);
            setWinningLine(result.winningLine);


            setWinData({
                player: playerTurn,
                shape: newSquares[index],
                time: time,
            });

            setTimeout(() => {
                setShowWinMessage(true);
            }, 200);
        } else if (!newSquares.includes(null) && !result.winner) {
            setWinner(equals);
        }

        setSquares(newSquares);
        setIsNext(!isNext);
    };



    useEffect(() => {
        timer(setTime);

        return () => clearInterval(intervalID.current);
    }, []);

    function timer(setTime) {
        let sec = 0;
        let min = 0;

       intervalID.current = setInterval(() => {
            sec++;
            if (sec > 59) {
                min++;
                sec = 0;
            }

            const strTime = `${min}:${sec.toString().padStart(2, "0")}`;
            setTime(strTime);
        }, 1000);
    }

    const restartGame = () => {
        clearInterval(intervalID.current);
        intervalID.current = null;

        setSquares(Array(9).fill(null));
        setIsNext(true);
        setWinner(false);
        setWinningLine([]);
        setTime("0:00");
        setWinData({  player:"", shape: "", time: ""})
        setShowWinMessage(false);

        timer(setTime);
    };

    const styleWin = {
        marginTop: "10px",
        padding: "1px",
        border: "1px solid green",
        borderRadius: "10px",
        backgroundColor: "#d4edda",
        color: "#155724",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <div className="board">

            <button className="btn btn-light" disabled={true}><h7><b>Player 1: {playerOne}</b></h7></button>
            <button className="btn btn-light" disabled={true}><h7><b>Player 2: {playerTwo}</b></h7></button>
            <br/><br/>

            {squares.map((square, index) => (
                <Square
                    key={index}
                    value={square}
                    onClick={() => handleClick(index)}
                    style={{
                        backgroundColor: winningLine.includes(index) ? "green" : "darkcyan",
                        border: "1px solid black"
                    }}
                />
            ))}
            <div>
                <button type="button" className="btn btn-primary" onClick={restartGame}>Restart</button>
            </div>
            <div>
                {winner === equals ? (
                    <button className="btn btn-danger" disabled={true} ><b>Equals</b></button>
                ) : (
                    <div>
                        {showWinMessage && (
                            <div style={styleWin}>
                                <h6> Winner! 🎉</h6>
                                <p><b>Player:</b> {winData.player}</p>
                                <p><b>Shape:</b> {winData.shape}</p>
                                <p><b>Time:</b> {winData.time}</p>
                            </div>
                        )}

                    </div>
                    )}
            </div>



            <button style={{color:"white" , fontSize:"16px"}} type="button" className="btn btn-dark" disabled={true}><b>Time:</b> {time}</button>

        </div>
    );
}
