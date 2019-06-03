import React, {Fragment} from 'react';
import {
  Container,
  Navbar, Nav, NavItem, NavLink
} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import openSocket from 'socket.io-client';

import DiceRoller from './../DiceRoller'
import InitTracker from './../InitTracker'
import HealthTracker from './../HealthTracker'
import Entity from "./../Entity";
import NewCharacterForm from "./../NewCharacterForm"

var playerData;
var players;
var newPlayer = true;
var socket;
console.log("Generate")

function User () {
  if(playerData === undefined)
    return <Redirect to="/addNewPlayer"/>;

  //Prevent multiple connections
  if(newPlayer){
    newPlayer = !newPlayer;
    socket = openSocket('http://matthewgreenlaw.com:3001', {query: {type: "Player", name: playerData.name}})
    socket.emit('newPlayer', {
      id: socket.id,
      name: playerData.name
    })
  }
  return <Entity
    name={playerData.name}
    ac={playerData.ac}
    maxHP={playerData.maxHP}
    init={playerData.init}
    socket={socket}
  />
}

function callback (data) {
  playerData = data;
  //return <Redirect push to='/player'/>
  document.getElementById('player').click()
}

function addNewPlayer() {
  console.log("here")

  return <NewCharacterForm callback={callback}/>
}

const App = () => (
  <Router>
    <Navbar>
      <Nav>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/roller/">Dice Roller</Link>
        </NavItem>
        <NavItem>
          <Link to="/player" id="player">Player Area</Link>
        </NavItem>
      </Nav>
    </Navbar>
    <Route
      path="/addNewPlayer"
      component={addNewPlayer}
    />
    <Route
      path="/roller"
      component={DiceRoller}
    />
    <Route
      path="/player"
      component={User}
    />
  </Router>
);

export default App;
