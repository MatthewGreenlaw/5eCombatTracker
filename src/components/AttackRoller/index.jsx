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
      disadvantage: false,
      critical: false,
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
    console.log("Rolled: %s", this.state.die.res)
    console.log(params)
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
        params = { n: 1, min: 1, max: 20, replacement: true };
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
    this.setState({ die }, () => this.props.rollerCallback(this.state.die.res)); //Must update state or else data is lost, generateIntegers is async
  }

  rollD20(die, values) {
    var res = values[0] + die.mod;
    die.res = res;
    this.setState({ die }, () => this.props.rollerCallback(this.state.die.res)); //Must update state or else data is lost, generateIntegers is async
  }

  rollAdvantage(die, values) {
    var res = values[0] >= values[1] ? values[0] : values[1];
    die.res = res + die.mod;
    this.setState({ die }, () => this.props.rollerCallback(this.state.die.res)); //Must update state or else data is lost, generateIntegers is async
  }

  rollDisadvantage(die, values) {
    var res = values[0] <= values[1] ? values[0] : values[1];
    die.res = res + die.mod;
    this.setState({ die }, () => this.props.rollerCallback(this.state.die.res)); //Must update state or else data is lost, generateIntegers is async
  }

  render () {
    var die = this.state.die;
    var damageDice = [4, 6, 8, 10, 12]

    var diceCallback = (die) => {
      this.setState({
        die: die
      })
    }

    var displayAttackRoll = () => {
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={20} mod={die.mod} dice={[20]} res={die.res} callback={diceCallback}/>
          <Button onClick={this.rollDice} block>Attack</Button>
        </Fragment>);
    }

    var displayDamageRoll = () => {
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={4} mod={die.mod} dice={damageDice} res={die.res} callback={diceCallback} critical />
          <Button onClick={this.rollDice} block>Damage</Button>
        </Fragment>);
    }

    var displayHealRoll = () => {
      return (
        <Fragment>
          <DiceRemix n={1} mod={0} die={4} mod={die.mod} dice={damageDice} res={die.res} callback={diceCallback} hideType/>
          <Button onClick={this.rollDice} block>Heal</Button>
        </Fragment>);
    }

    var initNonAttackDie = () => {
      die.n = 1;
      die.die = 4;
      die.mod=0
      die.res = 0
    }

    var initAttackDie = () => {
      die.n = 1;
      die.die = 20;
      die.mod=0
      die.res = 0
    }

    var func;
    if(this.props.action.toLowerCase() === 'attack'){
      die.die !== 20 ? initAttackDie() : die.die = die.die;
      func = displayAttackRoll
    }
    else if (this.props.action.toLowerCase() === 'damage'){
      die.die === 20 ? initNonAttackDie() : die.die = die.die;
      func = displayDamageRoll
    }
    else if (this.props.action.toLowerCase() === 'heal'){
      die.die === 20 ? initNonAttackDie() : die.die = die.die;
      func = displayHealRoll
    }
    else{
        return func = null
      }

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
