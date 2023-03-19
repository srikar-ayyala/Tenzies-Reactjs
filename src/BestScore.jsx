export default function BestScore({bestScore, currScore, deleteBestScore}) {

    return <>{
        bestScore.time !== -1 &&
        <div className="end-card">
            {/* <div className="best-score"> */}
                <p className="curr-time">Current Time: {currScore.time/1000} Seconds</p>
                <p className="curr-rolls">Current Roll Count: {currScore.rolls}</p>
                <br />
                <p className="best-time">Best Time: {bestScore.time / 1000} Seconds</p>
                <p className="best-rolls">Best Roll Count: {bestScore.rolls}</p>
            {/* </div> */}
            <button className="clear-best-score" onClick={deleteBestScore}>Clear Scores</button>
        </div>
    }</>
}