import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
  Toast,
  ToastHeader,
  ToastBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Container
} from 'reactstrap'
import './styles.css'

export default class HealthTracker extends React.Component {
  static propTypes = {
    character: PropTypes.string,
    ac: PropTypes.number,
    max: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      current: this.props.max,
      temp: 0,
      damage: 0
    };
  }

  render(){
    var temp = this.props.temp;
    var damage = this.props.damage;
    var max = this.props.max;

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
      updateDamage(+e.target.value)
    }

    var updateDamage = (damage) => {
      this.setState({
        current: +this.props.max + this.state.temp - (damage),
        damage: damage
      })
    }

    this.props.socket.on("receiveDamage", damage => updateDamage(this.state.damage + damage));


    return(
      <Toast fade={false}>
        <ToastHeader>
          <Container>
            <Row>
              <h1>{this.props.character}</h1>
            </Row>
            <Row>
             {"AC: "}{this.props.ac}
            </Row>
          </Container>
        </ToastHeader>
        <ToastBody>
          <Table>
            <tbody>
              <tr>
                <td>Max HP</td>
                <td>{this.props.max}</td>
              </tr><tr>
                <td>Current HP</td>
                <td>{this.state.current}</td>
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
