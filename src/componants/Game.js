import Board from "./Board";
export default function Game({ playerOne, playerTwo }) {

    const ROWS = [ [0,1,2], [3,4,5] , [6,7,8]];
    const COLUMNS = [ [0,3,6] , [1,4,7] , [2,5,8]];
    const DIAGONALS =  [ [0,4,8], [2,4,6]];
    const LINES = [...ROWS, ...COLUMNS, ...DIAGONALS];
    const NO_WINNER = null;


    function calculateWin(squares){
        for (let index = 0; index < LINES.length; index++) {
            let line = LINES[index];
            let a = line[0], b = line[1], c = line[2];
            if (checkWin(squares[a],squares[b],squares[c])){
                return {winner: squares[a] , winningLine: [a,b,c]};
            }
        }
        return {winner: NO_WINNER , winningLine: []};
    }

    function checkWin(a,b,c){
        return a && a === b && a === c;
    }


    return (
        <div>
            <Board calculateWin={calculateWin} playerOne={playerOne} playerTwo={playerTwo}></Board>
        </div>
    )
}