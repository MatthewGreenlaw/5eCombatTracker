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
  Input
} from 'reactstrap'
import './styles.css'

export default class HealthTracker extends React.Component {
  static propTypes = {
    character: PropTypes.string,
    ac: PropTypes.number,
    max: PropTypes.number,
    current: PropTypes.number,
    temp: PropTypes.number,
    damage: PropTypes.number,
    res: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      character: this.props.character,
      ac: this.props.ac,
      max: this.props.max,
      current: this.props.max,
      res: this.props.res,
      temp: 0,
      damage: 0
    };
  }

  render(){
    /*var setTemp = () => {
      this.current = (this.max + this.temp) - this.damage;
      this.setState(current);
    }

    var setDamage = () => {
      // this.props.socket.on('damagePlayer', (dmg) => {//do stuff with dmg})
      this.current = this.max + this.temp) - this.damage;
      this.setState(current);
    }*/

    var setCurrent = () => {
      this.props.callback(
          {
            character: this.props.character,
            ac: this.props.ac,
            max: this.props.max,
            current: this.props.max,
            res: this.props.res,
            temp: this.props.temp,
            damage: this.props.damage
          },
          false
        );
        var current = (this.props.max + this.props.temp) - this.props.damage;
        this.setState({ current: current, res: 0 });
    }


    return(
      <Toast fade={false}>
        <ToastHeader>
          {this.props.character}
        </ToastHeader>
        <ToastBody>
          <Table>
            <tbody>
              <tr>
                <td>AC</td>
                <td>{this.props.ac}</td>
              </tr>
              <tr>
                <td>Max HP</td>
                <td>{this.props.max}</td>
              </tr><tr>
                <td>Current HP</td>
                <td>{this.props.current}</td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <FormGroup>
              <Label>
                {"Temp HP "}
                <Input type="number" value={this.props.temp} className={"width-sm"} />
              </Label>
              <Label>
                {"Damage "}
                <Input type="number" value={this.props.damage} className={"width-sm"} />
              </Label>
            </FormGroup>
          </Form>
        </ToastBody>
      </Toast>
    )
  }
}
