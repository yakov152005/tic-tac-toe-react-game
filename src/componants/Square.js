export default function Square({ value, onClick, style}) {
    const X = "X.png";
    const O = "O.png";

    return (
        <button className="square" onClick={onClick} style={style}>
            {value === "X" && <img src={X} alt="X" className="icon" />}
            {value === "O" && <img src={O} alt="O" className="icon" />}
        </button>
    );
}

