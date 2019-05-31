import React from 'react';
import {
  Container,
} from 'reactstrap';
import DiceRoller from './../DiceRoller';
import Entity from './../Entity'
import openSocket from 'socket.io-client';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.socket = openSocket('http://localhost:3001', {query: "type=Player"})
  }

  render () {
    var socket = this.socket;
    var players = [];
    var enemies = [];

    socket.on('newPlayer', (player) => {
      if(!players.includes(player)){
        players.push(player)
        this.setState({players})
      }
    })

    socket.on('newEnemy', (enemy) => {
      if(!enemies.includes(enemy)){
        enemies.push(enemy)
        this.setState({enemy})
      }
    })

    return (
      <Container>
        <Entity name="matt" players={players} socket = {socket}/>
      </Container>

    );
  }
}
