import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import { generateIntegers } from "./../utils/randomNumberGenerator";
import {
  Table,
  Form,
  Button,
  Input
} from 'reactstrap'
import './styles.css'

export default class InitTracker extends React.Component {
  static propTypes = {
    players: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };
  }

  render(){
    var arr = [];
    var n = 1;
    var die = 20;
    var modifier = 0;

    var rollInit = () => {
      //console.log("InitRoller => n: %s, die: %s, mod: %s", n, die, modifier)
      generateIntegers(
        (vals) => {
          sendInit(vals[0] + +modifier)
        },
        { n: 1, min: 1, max: 20, replacement: true }
      )
    }

    var sendInit = (newInit) => {
      this.props.socket.emit("updateInitiative", {
        id: this.props.socket.id,
        name: this.props.name,
        init: newInit
      });
    }

    var displayInitRoll = () => {
      return (
        <Form inline>
          <Button onClick={rollInit} style = {{marginRight: '1em'}}>
            Attack
          </Button>
          {' + '}
          <Input
            type="number"
            onChange={value => modifier = +value}
            placeholder={modifier}
          />
        </Form>
      )
    }

    var setInit = (e) => {
      updateInit(+e.target.value)
    }

    var updateInit = (player) => {
      var players = this.state.players
      for (var i in players) {
        var _player = players[i]
        if(player.id === _player.id){
          players[i].init = player.init
          this.setState({players})
          return
        }
      }
    }

    this.props.socket.on("updateInitiative", player => updateInit(player));

    this.props.players.forEach((player)=>{
      arr.push(
        <tr>
          <td>{player.name}</td>
          <td>{player.init}</td>
        </tr>
      )
    })
    return(
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initiative</th>
          </tr>
        </thead>
        <tbody>
          {arr}
          <tr>{displayInitRoll}</tr>
        </tbody>
      </Table>
    )
  }
}
