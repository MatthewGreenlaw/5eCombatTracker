import React, { Fragment } from "react";
import {
  Button,
  Row,
  Col,
} from "reactstrap";
import Dice from "./../Dice";
import "./styles.css";
import { generateIntegers } from "./../utils/randomNumberGenerator";

export default class DiceRoller extends React.Component {
  constructor(props) {
    super(props);

    this.addDie = this.addDie.bind(this);
    this.removeDie = this.removeDie.bind(this);

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
      rolls: [this.defaultDie]
    };
  }

  roll(func, params, rolls, i) {
    generateIntegers(
      func.bind(null, rolls, i), //curry: https://javascript.info/currying-partials
      params
    );
  }

  rollDice(rolls) {
    rolls.forEach((die, i) => {
      var func, rngParams;

      if (die.die === 20) {
        if (die.advantage && !die.disadvantage) {
          rngParams = { n: 2, min: 1, max: 20, replacement: true };
          func = this.rollAdvantage;
        } else if (die.disadvantage && !die.advantage) {
          rngParams = { n: 2, min: 1, max: 20, replacement: true };
          func = this.rollDisadvantage;
        } else {
          rngParams = { n: die.n, min: 1, max: 20, replacement: true };
          func = this.rollD20;
        }
      } else if (die.critical) {
        rngParams = { n: die.n * 2, min: 1, max: die.die, replacement: true };
        func = this.summedValues;
      } else {
        rngParams = { n: die.n, min: 1, max: die.die, replacement: true };
        func = this.summedValues;
      }

      this.roll(func, rngParams, rolls, i);
    });
  }

  summedValues(rolls, i, values) {
    var sum = values.reduce((result, val) => {
      return result + val;
    });
    rolls[i].res = sum + rolls[i].mod;
    this.setState({ rolls }); //Must updates state here. Info will be lost otherwise.
  }

  rollD20(rolls, i, values) {
    var roll = rolls[i];
    var res;

    if (values.length === 1) {
      var criticalIcon =
        values[0] === 20 ? " \u2618" : values[0] === 1 ? " \u2620" : "";
      res = values[0] + roll.mod + criticalIcon;
    } else {
      res = " (";
      values.forEach(val => {
        res += val + roll.mod + ", ";
      });
      res = res.slice(0, -2);
      res += ")";
    }

    roll.res = res;
    this.setState({ rolls }); //Must update state or else data is lost, generateIntegers is async
  }

  rollAdvantage(rolls, i, values) {
    console.log("Rolled Advantage")
    var roll = rolls[i];
    var res = values[0] >= values[1] ? values[0] : values[1];
    roll.res = res + roll.mod + " (" + values[0] + ", " + values[1] + ")";
    this.setState({ rolls }); //Must update state or else data is lost, generateIntegers is async
  }

  rollDisadvantage(rolls, i, values) {
    var roll = rolls[i];
    var res = values[0] <= values[1] ? values[0] : values[1];
    roll.res = res + roll.mod + " (" + values[0] + ", " + values[1] + ")";
    this.setState({ rolls }); //Must update state or else data is lost, generateIntegers is async
  }

  addDie() {
    var rolls = this.state.rolls;
    rolls.push(
      JSON.parse(JSON.stringify(this.defaultDie)) //Deep copy
    );
    this.setState({ rolls });
  }

  removeDie(die) {
    var rolls = this.state.rolls;
    rolls.splice(die.nth, 1);
    this.setState({ rolls });
  }

  render() {
    var rolls = this.state.rolls;//seperate from state to decrease re-render

    var diceCallback = (die, update) => {
      if (die.hidden) {
        rolls.splice(die.nth, 1);
        this.setState(rolls);
      } else if (update) {
        //Re-render all children
        rolls[die.nth] = die;
        this.setState({ rolls });
      } else {
        //No need to re-render all chilren
        rolls[die.nth] = die;
      }
    };

    var buildChildren = () => {
      if (rolls.length > 1) {
        var dice = [];
        rolls.forEach((roll, key) => {
          //console.log(roll);
          dice.push(
            <Dice
              nth={key}
              n={roll.n}
              die={roll.die}
              mod={roll.mod}
              res={roll.res.toString(10)}
              advantage={roll.advantage}
              disadvantage={roll.disadvantage}
              critical={roll.critical}
              callback={diceCallback}
              key={key}
              removable={true}
            />
          );
        });
        return dice;
      } else {
        var roll = rolls[0];
        //console.log(roll);
        return (
          <Dice
            nth={0}
            n={roll.n}
            die={roll.die}
            mod={roll.mod}
            res={roll.res.toString(10)}
            advantage={roll.advantage}
            disadvantage={roll.disadvantage}
            critical={roll.critical}
            callback={diceCallback}
          />
        );
      }
    };

    return (
      <Fragment>
        <Row>
          <Col>
            <Row>
              <Button onClick={this.addDie} block={true}>
                + Add Die
              </Button>
            </Row>
            <Row>
              <Col style={{ padding: "0" }}>{buildChildren()}</Col>
            </Row>
            <Row>
              <Button
                onClick={() => {
                  this.rollDice(rolls);
                }}
                block={true}
              >
                Roll
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
