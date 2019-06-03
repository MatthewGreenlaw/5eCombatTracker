import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
} from 'reactstrap'
import './styles.css'

export default class InitTracker extends React.Component {
  static propTypes = {
    players: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      players: this.props.players
    };
  }

  render(){
    var arr = [];
    var modifier = 0;

    var callback = () => {
      console.log("AttackRoller => n: %s, die: %s, mod: %s", n, die, modifier)
      generateIntegers(
        (vals) => {
          this.props.callback(vals[0] + +modifier)
        },
        { n: 1, min: 1, max: 20, replacement: true }
      )
    }

    var displayInitRoll = () => {
      n = 1;
      die = 20;
      return (
        <Form inline>
          <Button onClick={callback} style = {{marginRight: '1em'}}>
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

    var updateInit = (player, ac) => {
      var players = this.state.players;
      this.props.players.forEach((player)=>{
        if(this.props.name === player)
          this.props.ac = ac;
      })
      this.setState({players});
    }

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
