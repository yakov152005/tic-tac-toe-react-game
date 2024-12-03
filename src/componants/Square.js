export default function Square({ value, onClick }) {
    const X = "X.png";
    const O = "O.png";

    return (
        <button className="square" onClick={onClick} style={{background:"darkcyan"}}>
            {value === "X" && <img src={X} alt="X" className="icon" />}
            {value === "O" && <img src={O} alt="O" className="icon" />}
        </button>
    );
}

