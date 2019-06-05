import React, {Fragment} from 'react';
import {
  Jumbotron,
  Navbar, Nav, NavItem, NavbarBrand, NavbarToggler,
  Collapse,
  Button,
  Container,
  Row, Col,
  Toast, ToastHeader, ToastBody
} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import openSocket from 'socket.io-client';

import {
  BannerImage,
  BannerHeader,
  Content,
} from './../Parallax/ParallaxComponents'
import DiceRoller from './../DiceRoller'
import Entity from "./../Entity";
import DungeonMaster from './../DungeonMaster'
import NewCharacterForm from "./../NewCharacterForm"
import NewDMForm from "./../NewDMForm"
import InitTracker from "./../InitTracker"
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
    console.log("Generate")

    function DM() {
      if(dmData === undefined)
        return <Redirect to="/addNewDM"/>;

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

    function Player () {
      if(playerData === undefined)
        return <Redirect to="/addNewPlayer"/>;

      //Prevent multiple connections
      if(newPlayer){
        newPlayer = !newPlayer;
        socket = openSocket('http://matthewgreenlaw.com:3001', {query: {type: "Player", name: playerData.name, lobby: playerData.lobby}})
        socket.emit('newPlayer', {
          lobby: playerData.loby,
          id: socket.id,
          name: playerData.name
        })
      }
      return (
          <Container>
            <Row>
              <Col><InitTracker socket={socket} style={{minHeight: "90%"}}/></Col>
              <Col><Toast style={{minHeight: "90%"}}><ToastHeader>Combat Log</ToastHeader><ToastBody><i>@todo</i></ToastBody></Toast></Col>
            </Row>
            <Row>
              <Entity
                name={playerData.name}
                ac={playerData.ac}
                maxHP={playerData.maxHP}
                init={playerData.init}
                socket={socket}
              />
            </Row>
          </Container>
      )
    }

    function playerDataCallback (data) {
      playerData = data;
      //return <Redirect push to='/player'/>
      document.getElementById('player').click()
    }

    function dmDataCallback (data) {
      dmData = data;
      //return <Redirect push to='/player'/>
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

    function redirectToLanding () {
      return <Redirect to="/landing"/>;
    }

    function landing () {
      return (
        <Fragment>
          <div id={"about"}>
            <BannerImage src={Doorway} height={.3}>
              <BannerHeader> D&D Combat Tracker </BannerHeader>
            </BannerImage>
            <Content title={"Welcome to the dungeon..."}  height={.7}>
              <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
              <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
              <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
            </Content>
          </div>
        <div id={"about"}>
          <BannerImage src={Dungeon} height={.3}>
            <BannerHeader> Upcoming Events </BannerHeader>
          </BannerImage>
          <Content title={"Meet the Devs"}  height={.7}>
            <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
            <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
            <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
            <Toast style={{width: "100%"}}><ToastHeader>Stuff in here</ToastHeader><ToastBody>This is the stuff I'm talking about</ToastBody></Toast>
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
            component={Player}
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
