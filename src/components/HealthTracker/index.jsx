import React from 'react';
import PropTypes from "prop-types";
import {
  Table,
  Input,
} from 'reactstrap'
import './styles.scss'

export default class HealthTracker extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    ac: PropTypes.number,
    max: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.recieveDamage = this.recieveDamage.bind(this)
    this.state = {
      current: this.props.max,
      temp: 0,
      damage: 0
    };

    this.props.socket.on("recieveDamage", (damage) => {
      //Monsters share a common socket,
      //must further identify by name
      if(this.props.name === damage.name){
          var newDamage = this.state.damage + damage.roll
          //Limit damage so that at most
          //current Health = -(maxHP) => damage = maxHP * 2
          if (newDamage > this.props.max * 2)
            newDamage = this.props.max * 2
        this.recieveDamage(newDamage)
      }
    });

    this.props.socket.on("recieveHeal", (healing) => {
      //Monsters share a common socket,
      //must further identify by name
      if(this.props.name === healing.name){
        var newDamage = this.state.damage - healing.roll
        //Cannot have negative damage
        if (newDamage < 0 )
          newDamage = 0
        this.recieveDamage(newDamage)
      }
    });
  }

  recieveDamage = (damage) => {
    //Cannot have negative damage
    if (damage  < 0)
      damage = 0

    //Build value to modify max health
    var modifier = this.state.temp - damage
    var tempHP

    //If the modifier represents damage
    if(modifier < 0){
      tempHP = 0
      damage = -(modifier)
    }
    //else it represents health
    else {
      tempHP = modifier
      damage = 0
    }

    this.setState({
      current: +this.props.max + modifier,
      temp: tempHP,
      damage: damage
    })
  }

  render(){
    //Called when munally changing Temp HP
    var setTempHealth = (e) => {
      var tempHealth = +e.target.value
      //Cannot have negative temp health, disreguard anything below 1
      if(tempHealth <= 0){
        this.setState({
          current: this.props.max - this.state.damage,
          temp: 0
        })
      }
      //tempHealth > 0, use it to set current
      else{
        this.setState({
          current: +this.props.max + tempHealth - this.state.damage,
          temp: tempHealth
        })
      }
    }

    //Called when manually changing Damage
    var setDamage = (e) => {
      var value = +e.target.value
      var tempHP = this.state.temp

      //Remove tempHP first
      //We have tempHP
      if(tempHP > 0){
        tempHP = tempHP - value
        //If we still have tempHP after damage
        if(tempHP > 0){
          this.setState({
            current: this.props.max + tempHP - this.state.damage,
            temp: tempHP
          })
        }
        //We are out of tempHP after damage
        else{
          this.setState({
            current: this.props.max + tempHP,//tempHP <= 0, so we are adding 0 or a negative number (remaining damage)
            temp: 0,
            damage: -(tempHP),
          })
        }
      }
      //We don't have tempHP
      else{
        this.recieveDamage(value)
      }
    }

    return(
      <Table className={"table-dark table-striped"}>
        <thead>
          <tr>
            <th>Health</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current HP</td>
            <td>{this.state.current + '/' + this.props.max}</td>
          </tr>
          <tr>
            <td>Temp HP</td>
            <td><Input
              onChange={setTempHealth}
              type="number"
              placeholder={this.state.temp}
              value={this.state.temp}
              className={"width-sm"} /></td>
          </tr>
          <tr>
            <td>Damage</td>
            <td><Input
            onChange={setDamage}
            type="number"
            placeholder={this.state.damage}
            value={this.state.damage}
            className={"width-sm"} /></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
