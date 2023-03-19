import { useState, useEffect } from "react";
import Dices from "./Dies";
import Confetti from "react-confetti";
import BestScore from "./BestScore";

function App() {
  const getRandDiceVal = () => Math.ceil(Math.random() * 6);
  const getTime = () => new Date().getTime();

  const [dices, setDiceVal] = useState(allNewDices());
  const [hasWon, setHasWon] = useState(false);
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || {
    time: -1,
    rolls: -1
  })
  const [gameStartTime, setGameStartTime] = useState(getTime());
  const [currScore, setCurrScore] = useState({
    time: 0,
    rolls: 1
  })

  function HandleRollClick() {
    if(hasWon) {
      setHasWon(false);
      setDiceVal(allNewDices());
      setCurrScore({
        time: 0,
        rolls: 1
      })
      setGameStartTime(getTime());
    } else {
        setDiceVal(prevDice => prevDice.map(prevDie =>
          ({
            ...prevDie,
            value: prevDie.isHeld?prevDie.value: getRandDiceVal()
          })
        ));

      setCurrScore(x => ({
        ...x,
        rolls: x.rolls+1
      }))
    }
  }

  function HandleDiceCLick(id) {
    setDiceVal(prevDice =>
      prevDice.map(prevDie => 
        ({
          ...prevDie,
          isHeld: prevDie.id === id? (!prevDie.isHeld): prevDie.isHeld
        })
      )
    )
    setCurrScore(x => ({
      ...x,
      time: getTime() - gameStartTime
    }))
  }

  function allNewDices() {
    let newDices = [];
    for(let i=0; i<10; i++) {
        newDices.push({
          value: getRandDiceVal(),
          isHeld: false,
          id: i
        })
    }
    return newDices;
  }

  function deleteBestScore() {
    setBestScore({
      time: -1,
      rolls: -1
    });
  }

  useEffect(() => {
    
    let checkIfWon = true;
    for(let i=0; i<dices.length; i++) {
      if(dices[i].value !== dices[0].value) checkIfWon = false;
      if(!dices[i].isHeld) checkIfWon = false;
    }
    
    if(checkIfWon) {
      setHasWon(true);
      setBestScore(prevBestScore => {
        if(prevBestScore.time === -1) return {
          ...currScore,
          time: currScore.time
        };
        let newBestScore = {
          time: Math.min(prevBestScore.time,currScore.time),
          rolls: Math.min(prevBestScore.rolls, currScore.rolls)
        }
        return newBestScore;
      })
    }

  }, [dices])
  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);

  return (<>
    <main>
      <div className="instructions">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <Dices dices={dices} onDiceClick={HandleDiceCLick}/>
      <button className="roll-btn" onClick={HandleRollClick}>{hasWon? "New Game": "Roll"}</button>
      {hasWon && <h1>You Won!!</h1>}
      {hasWon && <BestScore bestScore={bestScore} currScore={currScore} deleteBestScore={deleteBestScore}/>}
      {/* <button onClick={() => {localStorage.clear()}}>Clear score</button> */}
    </main>
    {hasWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
    </>
  );
}

export default App;
