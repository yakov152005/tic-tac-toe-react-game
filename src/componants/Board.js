import Square from "./Square";
import React, {useEffect, useState, useRef} from "react";

export default function Board({ playerOne, playerTwo , calculateWin}) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [winner, setWinner] = useState(false);
    const [winningLine, setWinningLine] = useState([true]);
    const [time, setTime] = useState("0:00");
    const intervalID = useRef(null);



    const handleClick = (index) => {
        if (squares[index] !== null || winner){
            return;
        }

        const newSquares = squares.slice();
        newSquares[index] = isNext ? "X" : "O" ;

        const result = calculateWin(newSquares);
        if (result.winner){
            setWinner(true);
            setWinningLine(result.winningLine);
        }

        if (!newSquares.includes(null) && !result.winner) {
            setWinner("Equals");
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
        setTime("0:00");


        timer(setTime);
    };




    return (
        <div className="board">
            <h7><b>Player One: {playerOne}</b></h7>
            <h7><b>Player Two: {playerTwo}</b></h7>
            <br/><br/>

            {squares.map((square, index) => (
                <Square
                    key={index}
                    value={square}
                    onClick={() => handleClick(index)}
                    style={{
                        backgroundColor: winningLine.includes(index) ? "red" : "white"
                    }}
                />
            ))}
            <div>
                <button type="button" className="btn btn-primary" onClick={restartGame}>Restart</button>
            </div>
            <div>
                {winner === "Equals" ? (
                    <input disabled={true} value="Equals"/>
                ) : (
                    winner && <input disabled={true} value={"Winner: " + (isNext ? "O" : "X")}/>
                )}
            </div>
            <div><p>Time: {time}</p></div>

        </div>
    );
}
