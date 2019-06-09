import React, {Fragment} from 'react';
import openSocket from 'socket.io-client';
import {
  Navbar, Nav, NavItem, NavbarBrand,
  Container,
  Row, Col,
  Toast, ToastHeader, ToastBody
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, Switch
} from 'react-router-dom';

import {
  BannerImage,BannerHeader, Content,
  DiceRoller,
  Player,
  DungeonMaster,
  InitTracker,
  NewCharacterForm,
  NewDMForm,
} from "./../../components"
import './style.scss'
import Doorway from './../../images/283686.jpg'
import Dungeon from './../../images/dungeon.jpg'

export default class RouteBar extends React.Component {

  render() {

    var playerData;
    var dmData;
    var newPlayer = true;
    var newDM = true;
    var socket;



    function DM() {
      if(dmData === undefined)
        return <Redirect to="/addNewDM"/>;

      //prevent opening multiple sockets for the same DM
      if(newDM){
        newDM = !newDM;
        socket = openSocket('http://matthewgreenlaw.com:3001', {query: {type: "DM", name:"Monsters", lobby: dmData.lobby}})
        socket.emit('newDM', {
          lobby:dmData.lobby,
          id: socket.id,
          name: dmData.name,
        })
      }
      return <Container><DungeonMaster socket={socket}/></Container>
    }

    function Character () {
      if(playerData === undefined)
        return <Redirect to="/addNewPlayer"/>;

      //prevent opening multiple sockets for the same player
      if(newPlayer){
        newPlayer = !newPlayer;
        socket = openSocket('http://matthewgreenlaw.com:3001', {query: {type: "Player", name: playerData.name, lobby: playerData.lobby}})
        socket.emit('newPlayer', {
          lobby: playerData.loby,
          id: socket.id,
          name: playerData.name
        })
      }

      return <Container><Player socket={socket} playerData={playerData}/></Container>
    }

    function playerDataCallback (data) {
      playerData = data;
      document.getElementById('player').click()
    }

    function dmDataCallback (data) {
      dmData = data;
      document.getElementById('dungionMaster').click()
    }

    function addNewDM() {
      return <Container><NewDMForm callback={dmDataCallback}/></Container>
    }

    function addNewPlayer() {
      return <Container><NewCharacterForm callback={playerDataCallback}/></Container>
    }

    function dice() {
      return <Container><DiceRoller/></Container>
    }

    function landing () {
      return (
        <Fragment>
          <div>
            <BannerImage src={Doorway} height={.3}>
              <BannerHeader> D&D Combat Tracker </BannerHeader>
            </BannerImage>
            <Content title={"Welcome to the dungeon..."}  height={.7}>
              <Toast style={{width: "100%"}}><ToastHeader>Join A Game!</ToastHeader><ToastBody>Get your DM's ID and and join their game as a <Link to="/PlayerTracker" id="player">player</Link>.</ToastBody></Toast>
              <Toast style={{width: "100%"}}><ToastHeader>Start A Game!</ToastHeader><ToastBody>Get your friends together to play a game. All you have to do is give them your DM ID and start <Link to="/DMTracker" id="player">DMing</Link>.</ToastBody></Toast>
              <Toast style={{width: "100%"}}><ToastHeader>Need some dice?</ToastHeader><ToastBody>Don't forget about our luxurious <Link to="/roller/">dice roller</Link>.</ToastBody></Toast>
            </Content>
          </div>
        <div>
          <BannerImage src={Dungeon} height={.3}>
            <BannerHeader> Credits & Project Information</BannerHeader>
          </BannerImage>
          <Content title={"Meet the Devs, contribute..."}  height={.7}>
            <Row>
              <Col>
                <Toast style={{width: "100%"}}><ToastHeader>Developer: Matthew Greenlaw</ToastHeader><ToastBody>Check out <a href={'https://matthewgreenlaw.github.io/portfolio/'} target={"_Blank"}>Matt's portfolio</a></ToastBody></Toast>
                <Toast style={{width: "100%"}}><ToastHeader>Developer: Theron Anderson</ToastHeader><ToastBody>Check out <a href={'https://atheron80.github.io/'} target={"_Blank"}>Theron's portfolio</a></ToastBody></Toast>
              </Col>
            </Row>
            <Row>
              <Col>
                <Toast style={{width: "100%"}}><ToastHeader>This project is open source!</ToastHeader><ToastBody>Interested in contributing to the project? Want to make your own rip off? Check it out on <a href={'https://github.com/MatthewGreenlaw/5eCombatTracker'} target={"_Blank"}>GitHub</a>.</ToastBody></Toast>
                <Toast style={{width: "100%"}}><ToastHeader>Found a bug?</ToastHeader><ToastBody>Something isn't working? Did Grog get hit for way too much damage? Dice roller not rolling the rite dice? Start an <a href={'https://github.com/MatthewGreenlaw/5eCombatTracker/issues'} target={"_Blank"}>issue</a>.</ToastBody></Toast>
              </Col>
            </Row>
          </Content>
        </div>
      </Fragment>
      )
    }
    return (

      <Router>
        <Navbar className={"navbar-dark bg-dark sticky-top"}>
          <NavbarBrand>Combat Tracker</NavbarBrand>
          <Nav>
            <NavItem>
                <Link to="/landing" className={"nav-link"}>Home</Link>
            </NavItem>
            <NavItem>
                <Link to="/roller/" className={"nav-link"}>Dice Roller</Link>
            </NavItem>
            <NavItem>
                <Link to="/PlayerTracker" id="player" className={"nav-link"}>Player Tracker</Link>
            </NavItem>
            <NavItem>
                <Link to="/DMTracker" id="dungionMaster" className={"nav-link"}>DM Tracker</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>

          <Route
            path="/addNewDM"
            component={addNewDM}
          />
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
            component={Character}
          />
          <Route
            path="/DMTracker"
            component={DM}
          />
          <Route
            path="*"
            component={landing}
          />
        </Switch>
      </Router>

    )
  }
}
