import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    coordinates: [1,1],
    totalMoves: 0,
    // X: 0, 
    // O: 0,
    board: [
            ["", "", ""],
            ["", "B", ""],
            ["", "", ""]
           ],
    message: "", 
    email: "",
  };
  
handleEmailChange = (evt) => {
  this.setState({
    ...this.state,
    email: evt.target.value,
  })
}

  submitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/api/result", 
    {
      x: this.state.coordinates[0], 
      y: this.state.coordinates[1], 
      steps: this.state.totalMoves, 
      email: this.state.email,
    })
  // .then(res => {
  //   console.log(res)
  // })
  // .catch(err => console.log(err, "caught error"))
  }
  


  moveRight = () => {
    if(this.state.coordinates[1] >= 2) { 
    this.setState({
      ...this.state,
      message: "You can't go right",
    })
  } else {
    let currentCoordinates = this.state.coordinates; 
    currentCoordinates[1] += 1;
    this.setState({
      ...this.state, 
      coordinates: currentCoordinates, 
      totalMoves: this.state.totalMoves + 1, 
    })
   }
  }

  moveLeft = () => {
    if(this.state.coordinates[1] <= 0) { 
    this.setState({
      ...this.state,
      message: "You can't go left",
    })
  } else {
    let currentCoordinates = this.state.coordinates; 
    currentCoordinates[1] -= 1;
    this.setState({
      ...this.state, 
      coordinates: currentCoordinates, 
      totalMoves: this.state.totalMoves + 1, 
    })
   }
  }

  moveUp = () => {
    if(this.state.coordinates[0] <= 0) { 
    this.setState({
      ...this.state,
      message: "You can't go up",
    })
  } else {
    let currentCoordinates = this.state.coordinates; 
    currentCoordinates[0] -= 1;
    this.setState({
      ...this.state, 
      coordinates: currentCoordinates, 
      totalMoves: this.state.totalMoves + 1, 
    })
   }
  }

  moveDown = () => {
    if(this.state.coordinates[0] >= 2) { 
    this.setState({
      ...this.state,
      message: "You can't go down",
    })
  } else {
    let currentCoordinates = this.state.coordinates; 
    currentCoordinates[0] += 1;
    this.setState({
      ...this.state, 
      coordinates: currentCoordinates, 
      totalMoves: this.state.totalMoves + 1, 
    })
   }
  }

  reset = () => {
    this.setState({
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


  render() {
    const { className } = this.props
    let newBoard = [];
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinates[0]}, {this.state.coordinates[1]})</h3>
          <h3 id="steps">You moved {this.state.totalMoves} times</h3>
        </div>
        <div id="grid">
      { this.state.board.map((item, Yindex) => {
        return (
           item.map((subitem, Xindex) => {
            if (Yindex == this.state.coordinates[0] && Xindex == this.state.coordinates[1]) {
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left"onClick={this.moveLeft}>LEFT</button>
          <button id="up"onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down"onClick={this.moveDown}> DOWN</button>
          <button id="reset"onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.submitForm}>
          <input id="email" 
                 type="email" 
                 placeholder="type email" 
                 value={this.state.email} 
                 onChange={this.handleEmailChange}>

                 </input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

