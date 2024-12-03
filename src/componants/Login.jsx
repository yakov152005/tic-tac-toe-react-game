import {useState} from "react";
import Game from "./Game";

export default function Login() {
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dataPlayers = () => {
        if (isNotValidP1()) {
            alert('Please enter a valid name for player One.');
            return;
        }

        if (isNotValidP2()) {
            alert('Please enter a valid name for player Two.');
            return;
        }

        setIsLoggedIn(true);
    };

    function isNotValidP1() {
        return playerOne.length === 0 || playerOne.trim() === '';
    }

    function isNotValidP2() {
        return playerTwo.length === 0 || playerTwo.trim() === '';
    }

    const styleLogin = {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/background-tictactoi.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

/* regular buttons
<h3 style={{color: "yellow"}}><b>Player 1:</b></h3>
                    <input
                        type="text"
                        placeholder="enter your name player 1"
                        value={playerOne}
                        onChange={(e) => setPlayerOne(e.target.value)}
                    />
                    <h3 style={{color: "black"}}><b>Player 2:</b></h3>
                    <input
                        type="text"
                        placeholder="enter your name player 2"
                        value={playerTwo}
                        onChange={(e) => setPlayerTwo(e.target.value)}
                    /><br/> <br/>
 */

    return (
        <div style={styleLogin}>
            {!isLoggedIn ? (
                <div>
                    <div className="input-group">
                        <span className="input-group-text">Player 1</span>
                        <textarea className="form-control" aria-label="With textarea"
                                  placeholder={"enter your name"}
                                  value={playerOne}
                                  onChange={(e) => setPlayerOne(e.target.value)}
                        ></textarea>
                    </div>
                    <br/>
                    <div className="input-group">
                        <span className="input-group-text">Player 2</span>
                        <textarea className="form-control" aria-label="With textarea"
                                  placeholder={"enter your name"}
                                  value={playerTwo}
                                  onChange={(e) => setPlayerTwo(e.target.value)}
                        ></textarea>
                    </div>
                    <br/>
                    <div className="center-container">
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={dataPlayers}>Let's Play
                        </button>
                    </div>
                </div>
            ) : (
                <Game playerOne={playerOne} playerTwo={playerTwo}/>
            )}
        </div>
    );


}