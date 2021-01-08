const ResultCard = (props) => {
    return (
        <div className="results text-center">
            {props.drawDate && <h1 className="display-5 text-center">YOU WON!</h1>}
            {props.drawDate && <h5 className="text-center">You didn't win anything. Better luck next time!</h5>}
        </div>
    );
}

export default ResultCard;