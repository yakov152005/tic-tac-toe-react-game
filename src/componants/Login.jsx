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

    return (
        <div style={{paddingTop: '10px'}}>
            {!isLoggedIn ? (
                <div>
                    <h3>Player 1:</h3>
                    <input
                        type="text"
                        placeholder="enter your name"
                        value={playerOne}
                        onChange={(e) => setPlayerOne(e.target.value)}
                    />
                    <h3>Player 2:</h3>
                    <input
                        type="text"
                        placeholder="enter your name"
                        value={playerTwo}
                        onChange={(e) => setPlayerTwo(e.target.value)}
                    /><br/> <br/>
                    <button type="button"
                            className="btn btn-secondary"
                            onClick={dataPlayers}>Let's Play
                    </button>
                </div>
            ) : (
                <Game playerOne={playerOne} playerTwo={playerTwo} />
            )}
        </div>
    );
}