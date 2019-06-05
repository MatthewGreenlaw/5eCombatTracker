import React from 'react';
import {
  Jumbotron,
  Navbar, Nav, NavItem, NavbarBrand
} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import openSocket from 'socket.io-client';
import Player from './../Player';


import DiceRoller from './../DiceRoller'
import Entity from "./../Entity";
import NewCharacterForm from "./../NewCharacterForm"

export default class RouteBar extends React.Component {

  render() {

    var playerData;
    var newPlayer = true;
    var socket;
    console.log("Generate")

    function User () {
      if(playerData === undefined)
        return <Redirect to="/addNewPlayer"/>;

      //Prevent multiple connections
      if(newPlayer){
        newPlayer = !newPlayer;
        socket = openSocket('http://localhost:3001', {query: {type: "Player", name: playerData.name}})
        socket.emit('newPlayer', {
          id: socket.id,
          name: playerData.name
        })
      }
      return <Player socket={socket} player={playerData}/>
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

    return (

      <Router>
        <Navbar>
          <NavbarBrand>Combat Tracker</NavbarBrand>
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

    )
  }
}
