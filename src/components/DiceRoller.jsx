import React, {Fragment} from 'react';
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Jumbotron,
} from 'reactstrap'
import Dice from './Dice'
import './styles.css'

var RandomOrg = require('random-org');

export default class DiceRoller extends React.Component {
  constructor(props) {
    super(props);

    this.addDie = this.addDie.bind(this)
    this.removeDie = this.removeDie.bind(this)

    this.defaultDie = {
      n: 1,
      die: 20,
      mod: 0,
      res: 0,
    }

    this.roll = this.roll.bind(this)
    this.state = {
      rolls: [ this.defaultDie ]
    };
  }

  roll (rolls) {
    var randomAPI = require('random-org');
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})

     rolls.forEach((roll, i) => {
      console.log(roll)
      var min = roll.n + roll.mod;
      var max = (roll.n * roll.die) + roll.mod;

      var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
      random.generateIntegers({ n: 1, min: min, max: max, replacement: true})
        .then((result) => {
          var _rolls = rolls;
          _rolls[i].res = result.random.data[0] + roll.mod
          this.setState({rolls: _rolls})//getIntegers is asynchronous, must update state here
        })
        .catch(e => {
          console.log(e)
        })
    });
  }

  addDie() {
    var rolls = this.state.rolls;
    rolls.push(
      JSON.parse(JSON.stringify(this.defaultDie))//Deep copy
    );
    this.setState({rolls})
  }

  removeDie(die) {
    var rolls = this.state.rolls;
    rolls.splice(die.nth, 1);
    this.setState({rolls})
  }

  render () {
    var rolls = this.state.rolls;

    var diceCallback = (die) => {
      if(die.hidden){
        rolls.splice(die.nth, 1);
        this.setState(rolls);
      }
      else {
        rolls[die.nth] = die;
      }
    }

    var buildChildren = () => {
      var dice = [];

      if (rolls.length > 1) {
        rolls.forEach((roll, key) => {
          console.log(roll)
          dice.push(
            <Dice key={key} nth={key} n={roll.n} die={roll.die} mod={roll.mod} res={roll.res} callback={diceCallback} removable={true}/>
          )
        })
        return dice;
      } 
      else {
        var roll = rolls[0];
        return <Dice nth={0} n={roll.n} die={roll.die} mod={roll.mod} res={roll.res} callback={diceCallback}/>
      }
    }

    return(
      <Fragment>
        <Row>
          <Col>
            <Row>
              <Button onClick={this.addDie} block={true}>
                  &#43;
                  Add Die
              </Button>
            </Row>
            <Row>
              <Col style={{padding: '0'}}>
                {buildChildren()}
              </Col>
            </Row>
            <Row>
              <Button onClick={() => {this.roll(rolls)}} block={true}>
                Roll
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment>
    )
  }
}