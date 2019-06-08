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
      console.log(damage)
      if(this.props.name === damage.name)
        this.updateDamage(this.state.damage + damage.roll)
    });

    this.props.socket.on("recieveHeal", healing => this.updateDamage(this.state.damage - healing));
  }

  updateDamage = (damage) => {
    if (damage  < 0)
      damage = 0
    this.setState({
      current: +this.props.max + this.state.temp - (damage),
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
      this.updateDamage(+e.target.value)
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
                  value={temp}
                  className={"width-sm"} /></td>
              </tr>
              <tr>
                <td>Damage</td>
                <td><Input
                onChange={setDamage} //@todo validate for negative #s
                type="number"
                placeholder={this.state.damage}
                value={damage}
                className={"width-sm"} /></td>
              </tr>
            </tbody>
          </Table>
        </ToastBody>
      </Toast>
    )
  }
}
