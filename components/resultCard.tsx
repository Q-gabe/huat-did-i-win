const ResultCard = (props) => {

    // Add commas to bet winnings
    let winningsTotal = props.winnings.toString();
    let winnings = ''
    let digits = 0
    for (let i = winningsTotal.length - 1; i >= 0; i--) {
        digits++;
        if ((digits-1) % 3 == 0 && digits != 1) {
            winnings = ',' + winnings;
        }
        winnings = winningsTotal[i] + winnings
    }

    // Add listings for winning bets
    let winningBets = []
    if (props.winningBets) {
        for (let i = 0; i < props.winningBets.length; i++) {
            winningBets.push(<li key={"bet-"+i}>{''+props.winningBets[i]}</li>)
        }
    }

    return (
        <div className="results text-center">
            {props.winnings && <>
                <h1 className="display-5 text-center mb-2">YOU WON ${winnings}!</h1>
                <div className="text-center">
                    <blockquote className="text-center mb-1">Winning bets:</blockquote>
                    <ul className="winning-bets">
                        {winningBets}
                    </ul>
                </div>
            </>
            }
            {!props.winnings && <h5 className="text-center">You didn't win anything. Better luck next time!</h5>}
        </div>
    );
}

export default ResultCard;