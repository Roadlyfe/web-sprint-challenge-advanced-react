import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    totalMoves: 0,
    b: ["","","","","B","","","",""],
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
      x: this.getCoords()[0], 
      y: this.getCoords()[1], 
      steps: this.state.totalMoves, 
      email: this.state.email,
    })
    .then(res => {
      this.setState({
        ...this.state,
        message: res.data.message,
        email: "",
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message,
        email: ""
      })
    })
  }
  
  moveRight = () => {
    let currentCoords = this.getCoords()
    
    if (currentCoords[0] >= 3) {
      this.setState({
        ...this.state,
        message: "You can't go right",
      }) 
    } else {
      currentCoords[0] += 1
      this.updateBoard(currentCoords)
      this.setState({
        ...this.state,
        b: this.updateBoard(currentCoords),
        totalMoves: this.state.totalMoves + 1, 
      })
    }
  }
  
  moveLeft = () => {
    let currentCoords = this.getCoords()
    if (currentCoords[0] <= 1) {
      this.setState({
        ...this.state,
        message: "You can't go left",
      }) 
    } else {
      currentCoords[0] -= 1
      this.updateBoard(currentCoords)
      this.setState({
        ...this.state,
        b: this.updateBoard(currentCoords),
        totalMoves: this.state.totalMoves + 1, 
      })
    }
  }
  
  moveUp = () => {
    let currentCoords = this.getCoords()
    if (currentCoords[1] <= 1) {
     this.setState({
       ...this.state,
       message: "You can't go up",
     })
    } else {
      currentCoords[1] -= 1
      this.updateBoard(currentCoords)
      this.setState({
       ...this.state,
       b: this.updateBoard(currentCoords),
       totalMoves: this.state.totalMoves + 1, 
     })
    }
  }
  
  moveDown = () => {
    let currentCoords = this.getCoords()
    if (currentCoords[1] >= 3) {
      this.setState({
        ...this.state,
        message: "You can't go down",
      })
    } else {
      currentCoords[1] += 1
      this.setState({
        ...this.state,
        b: this.updateBoard(currentCoords),
        totalMoves: this.state.totalMoves + 1, 
      })
    }
  }
  
  reset = () => {
    this.setState({
      totalMoves: 0,
      b: ["","","","","B","","","",""],
      message: "", 
      email: "",
    })
  }
  
  updateBoard = (pair) => {
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
  
  
  makeBoard = () => {
    let key = 0;
    return this.state.b.map((item) => {
      if (item != "") {
        return <div key={key+=1} className="active square">B</div>
      } else {
        return (
          <div key={key+=1} className="square"></div>
        )
      }
    })
  }
  
  getCoords = () => {
    let coords = [
      [1,1], [2,1], [3,1],
      [1,2], [2,2], [3,2],
      [1,3], [2,3], [3,3],
    ]
  
    let i = this.state.b.indexOf("B")
    return coords[i]
  }
  
  movesMessage = () => {
    if (this.state.totalMoves === 1) {
      return `You moved ${this.state.totalMoves} time`
    } else {
      return  `You moved ${this.state.totalMoves} times`
    }
  }

  render() {
    const { className } = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
        <h3 id="coordinates">Coordinates ({this.getCoords()[0]}, {this.getCoords()[1]})</h3>
          <h3 id="steps">{this.movesMessage()}</h3>
        </div>
        <div id="grid">
      {this.makeBoard()}
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