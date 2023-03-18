import { useState } from "react";
import Dices from "./Dies";
import Confetti from "react-confetti";

function App() {

  const [dices, setDiceVal] = useState(allNewDices());
  const [hasWon, setHasWon] = useState(false);

  function HandleRollClick() {
    if(hasWon) {
      setHasWon(false);
      setDiceVal(allNewDices());
    } else {
        setDiceVal(prevDice => {

        return prevDice.map(prevDie => {

          return {
            ...prevDie,
            value: prevDie.isHeld?prevDie.value: getRandDiceVal()
          }

        })
      });
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

    if(CheckIfWon()) {
      setHasWon(true);
    }
  }

  function CheckIfWon() {
    for(let i=0; i<dices.length; i++) {
      if(dices[i].value !== dices[0].value) return false;
    }
    return true;
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

  function getRandDiceVal() {
    return Math.ceil(Math.random() * 6);
  }

  return (<>

    <main>
      <div className="instructions">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <Dices dices={dices} onDiceClick={HandleDiceCLick}/>
      <button className="roll-btn" onClick={HandleRollClick}>Roll</button>
      {hasWon && <h1>You Won!!</h1>}
    </main>
    {hasWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
    </>
  );
}

export default App;
