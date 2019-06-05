import React from 'react';
import {
  Jumbotron,
  Navbar, Nav, NavItem, NavbarBrand, NavbarToggler,
  Collapse,
  Button,
  Container,
  Row, Col
} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import openSocket from 'socket.io-client';


import DiceRoller from './../DiceRoller'
import Entity from "./../Entity";
import DungeonMaster from './../DungeonMaster'
import NewCharacterForm from "./../NewCharacterForm"
import InitTracker from "./../InitTracker"
import './style.scss'

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
      return (
        <Jumbotron>
          <Row>
            <Col xs="2">
              <InitTracker socket={socket}/>
            </Col>
            <Col xs="10">
              <Entity
                name={playerData.name}
                ac={playerData.ac}
                maxHP={playerData.maxHP}
                init={playerData.init}
                socket={socket}
              />
            </Col>
          </Row>
        </Jumbotron>
      )
    }

    function callback (data) {
      playerData = data;
      //return <Redirect push to='/player'/>
      document.getElementById('player').click()
    }

    function addNewPlayer() {
      return <Container><p>You are being a player</p><NewCharacterForm callback={callback}/></Container>
    }

    function dice() {
      return <Container><DiceRoller/></Container>
    }

    function DM() {
      socket = openSocket('http://localhost:3001', {query: {type: "DM", name: "Monsters"}})
      return <Container><DungeonMaster socket={socket}/></Container>
    }
    return (

      <Router>
        <Navbar className={"navbar-dark bg-dark sticky-top"}>
          <NavbarBrand>Combat Tracker</NavbarBrand>
          <Nav>
            <NavItem>
                <Link to="/" className={"nav-link"}>Home</Link>
            </NavItem>
            <NavItem>
                <Link to="/roller/" className={"nav-link"}>Dice Roller</Link>
            </NavItem>
            <NavItem>
                <Link to="/PlayerTracker" id="player" className={"nav-link"}>Player Tracker</Link>
            </NavItem>
            <NavItem>
                <Link to="/DMTracker" id="dungeonMaster" className={"nav-link"}>DM Tracker</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Route
          path="/addNewPlayer"
          component={addNewPlayer}
        />
        <Route
          path="/roller"
          component={dice}
        />
        <Route
          path="/PlayerTracker"
          component={User}
        />
        <Route
          path="/DMTracker"
          component={DM}
        />
      </Router>

    )
  }
}
