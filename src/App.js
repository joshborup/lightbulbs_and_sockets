import React, { Component } from 'react';
import Bulb from './components/Bulb/Bulb';
import socketIOClient from 'socket.io-client';
import './App.css';
import bulbData from './components/Bulb/bulbData';

const socket = socketIOClient();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bulb1: false,
      bulbData: bulbData
    }
  socket.emit('room', 'user-connected');

  socket.on("update_bulb", (bulb) => {
    this.setState({
        [bulb.key]: bulb.value
    });
  })
  
  }

  send = (key, state) => {
      let bulbObj = {
        key: key,
        value: state
      }
      socket.emit("message", bulbObj) 
  }

  lightToggle = (key) => {
    this.setState((prevState)=>{
      this.send(key, !prevState[key])
      return {
        [key]: !prevState[key]
      }
    })
  }

  render() {

    let displayBulbs = this.state.bulbData.map(bulb => {
      return <Bulb bulbNumber={`bulb${bulb.id}`} color={bulb.color} lightToggle={this.lightToggle} bulb={this.state[`bulb${bulb.id}`]}/>
    })
    return (
      <div className="App">
        <div>
          <h1 className='common-heading'>Click or Tap a light to turn it on</h1>
          <h2 className='common-heading'>Anyone on this site will see the bulbs turn on in real time</h2>
        </div>
        <div>
          
          {displayBulbs}
        </div>
      </div>
    );
  }
}

export default App;
