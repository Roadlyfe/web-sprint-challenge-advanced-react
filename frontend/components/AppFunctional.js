import React, { useState } from 'react'
import axios from 'axios';
import { render } from '@testing-library/react';

export default function AppFunctional(props) {
  const [state, setState] = useState({
    totalMoves: 0,
    b: ["","","","","B","","","",""],
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
      x: getCoords()[0], 
      y: getCoords()[1], 
      steps: state.totalMoves, 
      email: state.email,
    })
    .then(res => {
      setState({
        ...state,
        message: res.data.message,
        email: ""
      })
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message,
        email: ""
      })
    })
  }

  const moveRight = () => {
    let currentCoords = getCoords()
    
    if (currentCoords[0] >= 3) {
      setState({
        ...state,
        message: "You can't go right",
      })
    } else {
      currentCoords[0] += 1
      updateBoard(currentCoords)
      setState({
        ...state,
        b: updateBoard(currentCoords),
        totalMoves: state.totalMoves + 1, 
      })
    }
  }

  const  moveLeft = () => {
    let currentCoords = getCoords()
    if (currentCoords[0] <= 1) {
    setState({
      ...state,
      message: "You can't go left",
    }) } else {
      currentCoords[0] -= 1
      updateBoard(currentCoords)
      setState({
      ...state,
      b: updateBoard(currentCoords),
      totalMoves: state.totalMoves + 1, 
      })
    }
  }

  const moveUp = () => {
    let currentCoords = getCoords()
    if (currentCoords[1] <= 1) {
    setState({
      ...state,
      message: "You can't go up",
    })
    } else {
      currentCoords[1] -= 1
      updateBoard(currentCoords)
      setState({
        ...state,
        b: updateBoard(currentCoords),
        totalMoves: state.totalMoves + 1, 
      })
    }
  }

  const moveDown = () => {
   let currentCoords = getCoords()
   if (currentCoords[1] >= 3) {
    setState({
      ...state,
      message: "You can't go down",
    })
   } else {
     currentCoords[1] += 1
     setState({
      ...state,
      b: updateBoard(currentCoords),
      totalMoves: state.totalMoves + 1, 
    })
   }
  }

  const reset = () => {
    setState({
      totalMoves: 0,
      b: ["","","","","B","","","",""],
      message: "", 
      email: "",
    })
  }

  const updateBoard = (pair) => {
    let coords = [
      [1,1], [2,1], [3,1],
      [1,2], [2,2], [3,2],
      [1,3], [2,3], [3,3],
    ]

    let i = coords.indexOf(pair)
    let newBoard = coords.map((item) => {
      if (item[0] == pair[0] && item[1] == pair[1]) {
        return "B"
      } else {
        return ""
      }
    })
    return newBoard;
  }

  const makeBoard = () => {
    let key = 0
    return state.b.map((item) => {
      if (item != "") {
        return <div key={key+=1} className="active square">B</div>
      } else {
        return (
          <div key={key+=1} className="square"></div>
        )
      }
    })
  }

  const getCoords = () => {
    let coords = [
      [1,1], [2,1], [3,1],
      [1,2], [2,2], [3,2],
      [1,3], [2,3], [3,3],
    ]

    let i = state.b.indexOf("B")
    return coords[i]
  }

  const movesMessage = () => {
    if (state.totalMoves === 1) {
      return `You moved ${state.totalMoves} time`
    } else {
      return  `You moved ${state.totalMoves} times`
    }
  }

  return (
    <div id="wrapper" className={props.className}>
   <div className="info">
          <h3 id="coordinates">Coordinates ({getCoords()[0]}, {getCoords()[1]})</h3>
          <h3 id="steps">{movesMessage()}</h3>
        </div>
        <div id="grid">
      {makeBoard()}

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