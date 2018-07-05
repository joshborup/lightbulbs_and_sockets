import React, { Component } from 'react';
import Bulb from './components/Bulb/Bulb';
import socketIOClient from 'socket.io-client';
import './App.css';
import bulbData from './components/Bulb/bulbData';
import * as animationData from './components/media/heart_with_particles.json';
import Lottie from 'react-lottie';

const socket = socketIOClient();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
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

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const style = {
      margin: 0
    }


    let displayBulbs = this.state.bulbData.map(bulb => {
      return <Bulb bulbNumber={`bulb${bulb.id}`} color={bulb.color} letter={bulb.letter} lightToggle={this.lightToggle} bulb={this.state[`bulb${bulb.id}`]}/>
    })

    return (
      <div className="App">
        <div>
          <h1 className='common-heading'>Tap a light to turn it on</h1>
          <h2 className='common-heading'>Anyone on this site will see the bulbs turn on in real time</h2>
        </div>
        <div>
          {displayBulbs}
        </div>
        <div className='attribution'>
          <h3> Made with &nbsp;</h3>
          <Lottie style={style} options={defaultOptions} height={70} width={70}/>
          <h3>&nbsp;by&nbsp;</h3>
          <h3>&nbsp;<a href='https://www.joshborup.com'>Josh Borup</a> </h3>
        </div>
      </div>
    );
  }
}

export default App;
