export default function Dices(props) {    
    let dicesElements = props.dices.map((x,i) => <Dice key={x.id} val={x.value} isHeld={x.isHeld} dieId={x.id} onDieClick={props.onDiceClick}/>);
    // console.log(props);
    return <div className="dices">
        {dicesElements}
    </div>
}

function Dice(props) {
    return <div className={"dice" + (props.isHeld? " held":"")} onClick={() => props.onDieClick(props.dieId)}>
        {props.val}
    </div>
}