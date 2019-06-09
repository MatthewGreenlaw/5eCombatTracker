import React from 'react';
import PropTypes from "prop-types";
import {
  Table,
  Toast,
  ToastBody,
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
    this.updateDamage = this.updateDamage.bind(this)
    this.state = {
      current: this.props.max,
      temp: 0,
      damage: 0
    };

    this.props.socket.on("recieveDamage", (damage) => {
      if(this.props.name === damage.name){
          var newDamage = this.state.damage + damage.roll
          if (newDamage > this.props.max * 2)
            newDamage = this.props.max
        this.updateDamage(newDamage)
      }
    });

    this.props.socket.on("recieveHeal", (healing) => {
      if(this.props.name === healing.name){
        var newDamage = this.state.damage - healing.roll
        if (newDamage < 0 )
          newDamage = 0
        this.updateDamage(newDamage)
      }
    });
  }

  updateDamage = (damage) => {
    if (damage  < 0)
      damage = 0

    var temp = this.state.temp;

    var modifier = temp - damage

    //var modifier, newTemp
    //modifier = newTemp = this.state.temp - damage
    var newTemp
    if(modifier < 0){
        newTemp = 0
        damage = -(modifier)
    }
    else {
      newTemp = modifier
      damage = 0
    }

    this.setState({
      current: +this.props.max + modifier,
      temp: newTemp,
      damage: damage
    })
  }

  render(){
    var temp = this.props.temp;
    var damage = this.props.damage;

    var setTempHealth = (e) => {
      if(+e.target.value <= 0){
        this.setState({
          current: this.props.max - this.state.damage,
          temp: 0
        })
      }
      else{
        this.setState({
          current: +this.props.max + (+e.target.value) - this.state.damage,
          temp: +e.target.value
        })
      }
    }

    var setDamage = (e) => {
      var value = +e.target.value
      var diff = this.state.damage - value

      if (diff === 1){//removed damaged
        var newDamage = this.state.damage-1
        if(newDamage < 0)
          newDamage = 0

        this.setState({
          current: +this.props.max + this.state.temp - newDamage,
          damage: newDamage
        })
      }
      else{//added dammage
        this.updateDamage(1)
      }
    }

    return(
      <Toast fade={false}>
        <ToastBody>
          <Table>
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
                  onChange={setTempHealth} //@todo validate for negative #s
                  type="number"
                  placeholder={this.state.temp}
                  value={this.state.temp}
                  className={"width-sm"} /></td>
              </tr>
              <tr>
                <td>Damage</td>
                <td><Input
                onChange={setDamage} //@todo validate for negative #s
                type="number"
                placeholder={this.state.damage}
                value={this.state.damage}
                className={"width-sm"} /></td>
              </tr>
            </tbody>
          </Table>
        </ToastBody>
      </Toast>
    )
  }
}
