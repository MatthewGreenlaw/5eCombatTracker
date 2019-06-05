import React, {Fragment} from 'react'
import {
  Button,
  Form, FormGroup,
  Label, Input,
  Row, Col,
  Toast, Card
} from 'reactstrap'
import './style.scss'
import Dice from './../Dice'
import DiceRemix from './../DiceRemix'
import { generateIntegers } from "./../utils/randomNumberGenerator";

export default class AttackRoller extends React.Component {

  constructor(props) {
    super(props);

    this.roll = this.roll.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.summedValues = this.summedValues.bind(this);
    this.rollD20 = this.rollD20.bind(this);
    this.rollAdvantage = this.rollAdvantage.bind(this);
    this.rollDisadvantage = this.rollDisadvantage.bind(this);

    this.defaultDie = {
      n: 1,
      die: 20,
      mod: 0,
      res: 0,
      advantage: false,
      disadvantage: false
    };

    this.state = {
      die: this.defaultDie
    };
  }

  roll(func, params, die) {
    generateIntegers(
      func.bind(null, die), //curry: https://javascript.info/currying-partials
      params
    );
  }

  rollDice() {
    var die = this.state.die
    var func, params;
    if (die.die === 20) {
      if (die.advantage && !die.disadvantage) {
        params = { n: 2, min: 1, max: 20, replacement: true };
        func = this.rollAdvantage;
      } else if (die.disadvantage && !die.advantage) {
        params = { n: 2, min: 1, max: 20, replacement: true };
        func = this.rollDisadvantage;
      } else {
        params = { n: die.n, min: 1, max: 20, replacement: true };
        func = this.rollD20;
      }
    } else if (die.critical) {
      params = { n: die.n * 2, min: 1, max: die.die, replacement: true };
      func = this.summedValues;
    } else {
      params = { n: die.n, min: 1, max: die.die, replacement: true };
      func = this.summedValues;
    }

    this.roll(func, params, die);
  }

  summedValues(die, values) {
    var sum = values.reduce((result, val) => {
      return result + val;
    });
    die.res = sum + die.mod;
    this.setState({ die }); //Must updates state here. Info will be lost otherwise.
    this.props.rollerCallback(die.res)
  }

  rollD20(die, values) {
    var res = values[0] + die.mod;
    die.res = res;
    this.setState({ die }); //Must update state or else data is lost, generateIntegers is async
    this.props.rollerCallback(die.res)
  }

  rollAdvantage(die, values) {
    var res = values[0] >= values[1] ? values[0] : values[1];
    die.res = res + die.mod;
    this.setState({ die }); //Must update state or else data is lost, generateIntegers is async
    this.props.rollerCallback(die.res)
  }

  rollDisadvantage(die, values) {
    var res = values[0] <= values[1] ? values[0] : values[1];
    die.res = res + die.mod;
    this.setState({ die }); //Must update state or else data is lost, generateIntegers is async
    this.props.rollerCallback(die.res)
  }

  render () {
    var die = this.state.die;
    var damageDice = [4, 6, 8, 10, 12]
    var advantage = false;
    var disadvantage = false;
    var n = 1;
    var die = 20;
    var modifier = 0;
    var result = 0;

    var diceCallback = (die) => {
      this.setState({
        die: die
      })
    }

    var displayAttackRoll = () => {
      n = 1;
      die = 20;
      modifier = 0;
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={20} dice={[20]} callback={diceCallback} disableN hideResult/>
          <Button onClick={this.rollDice} block>Attack</Button>
        </Fragment>);
    }

    var displayDamageRoll = () => {
      n = 1;
      die = 4;
      modifier = 0;
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={4} dice={[4, 8, 10, 12]} callback={diceCallback} critical hideResult/>
          <Button onClick={this.rollDice} block>Damage</Button>
        </Fragment>);
    }

    var displayHealRoll = () => {

      n = 4;
      die = 4;
      modifier = 0;
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={4} dice={[4, 8, 10, 12]} callback={diceCallback} hideResult hideType/>
          <Button onClick={this.rollDice} block>Heal</Button>
        </Fragment>);
    }

    var func;
    if(this.props.action.toLowerCase() === 'attack')
      func = displayAttackRoll
    else if (this.props.action.toLowerCase() === 'damage')
      func = displayDamageRoll
    else if (this.props.action.toLowerCase() === 'heal')
      func = displayHealRoll
    else
      return func = null

    return (
      <Fragment>
        <Row>
          <Col xs='12'>
            {func()}
          </Col>
        </Row>
      </Fragment>
    )
  }
}
