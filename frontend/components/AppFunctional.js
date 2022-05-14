import React, { useState } from 'react'

export default function AppFunctional(props) {
const [state, setState] = useState({
  coordinates: [1,1],
  totalMoves: 0,
  X: 0, 
  O: 0,
  board: [
          ["", "", ""],
          ["", "B", ""],
          ["", "", ""]
         ],
  message: "", 
  email: "",
})

const handleEmailChange = (evt) => {
  setState({
    ...state,
    email: evt.target.value,
  })
}

 const submitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/result", 
    {
      x: state.coordinates[0], 
      y: state.coordinates[1], 
      steps: state.totalMoves, 
      email: state.email,
    })
  .then(res => 
    console.log(res)
    ).catch(err => console.log(err, "caught error"))
  }
  


 const moveRight = () => {
    if(state.coordinates[1] >= 2) { 
    setState({
      ...state,
      message: "You can't go right",
    })
  } else {
    let currentCoordinates = state.coordinates; 
    currentCoordinates[1] += 1;
    setState({
      ...state, 
      coordinates: currentCoordinates, 
      totalMoves: state.totalMoves + 1, 
    })
   }
  }

 const  moveLeft = () => {
    if(state.coordinates[1] <= 0) { 
    setState({
      ...state,
      message: "You can't go left",
    })
  } else {
    let currentCoordinates = state.coordinates; 
    currentCoordinates[1] -= 1;
    setState({
      ...state, 
      coordinates: currentCoordinates, 
      totalMoves: state.totalMoves + 1, 
    })
   }
  }

 const moveUp = () => {
    if(state.coordinates[0] <= 0) { 
    setState({
      ...state,
      message: "You can't go up",
    })
  } else {
    let currentCoordinates = state.coordinates; 
    currentCoordinates[0] -= 1;
    setState({
      ...state, 
      coordinates: currentCoordinates, 
      totalMoves: state.totalMoves + 1, 
    })
   }
  }

 const moveDown = () => {
    if(state.coordinates[0] >= 2) { 
    setState({
      ...state,
      message: "You can't go down",
    })
  } else {
    let currentCoordinates = state.coordinates; 
    currentCoordinates[0] += 1;
    setState({
      ...state, 
      coordinates: currentCoordinates, 
      totalMoves: state.totalMoves + 1, 
    })
   }
  }

 const reset = () => {
    setState({
      coordinates: [1,1],
      totalMoves: 0,
      X: 0, 
      O: 0,
      board: [
              ["", "", ""],
              ["", "B", ""],
              ["", "", ""]
             ],
      message: '', 
    })
  }



  return (
    <div id="wrapper" className={props.className}>
   <div className="info">
          <h3 id="coordinates">Coordinates ({state.coordinates[0]}, {state.coordinates[1]})</h3>
          <h3 id="steps">You moved {state.totalMoves} times</h3>
        </div>
        <div id="grid">
      { state.board.map((item, Yindex) => {
        return (
           item.map((subitem, Xindex) => {
            if (Yindex == state.coordinates[0] && Xindex == state.coordinates[1]) {
              return <div key={Yindex + Xindex} className="square">B</div>
             } else {
              return (
                <div key={Yindex + Xindex} className="square"> {""}</div>
              )
             }
            })
           )}
      )}
          </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left"onClick={moveLeft}>LEFT</button>
          <button id="up"onClick={moveUp}>UP</button>
          <button id="right" onClick={moveRight}>RIGHT</button>
          <button id="down"onClick={moveDown}> DOWN</button>
          <button id="reset"onClick={reset}>reset</button>
        </div>
        <form onSubmit={submitForm}>
          <input id="email" 
                 type="email" 
                 placeholder="type email" 
                 value={state.email} 
                 onChange={handleEmailChange}>

                 </input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
