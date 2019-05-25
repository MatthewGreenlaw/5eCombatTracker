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

var randomAPI = require('random-org');

export default class DiceRoller extends React.Component {
  constructor(props) {
    super(props);

    this.addDie = this.addDie.bind(this)
    this.removeDie = this.removeDie.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.rollDie = this.rollDie.bind(this)
    this.rollD20 = this.rollD20.bind(this)
    this.rollAdvantage = this.rollAdvantage.bind(this)
    this.rollDisadvantage =this.rollDisadvantage.bind(this)

    this.defaultDie = {
      n: 1,
      die: 20,
      mod: 0,
      res: 0,
      advantage: false,
      disadvantage: false,
    }

    
    this.state = {
      rolls: [ this.defaultDie ]
    };
  }

  rollDice (rolls) {
     rolls.forEach((die, i) => {
      if(die.die === 20){
        
        if(die.advantage && die.disadvantage)
          this.rollD20(rolls, i);
        
        else if(die.advantage)
          this.rollAdvantage(rolls, i)
        
        else if(die.disadvantage)
         this.rollDisadvantage(rolls, i)
        
        else
          this.rollD20(rolls, i)
      }
      else if (die.critical)
        this.rollCritical(rolls, i)
      
      else
        this.rollDie(rolls, i)
      
    });
  }

  

  rollDie(rolls, i) {
    var roll = rolls[i]
    
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
    random.generateIntegers({ n: roll.n, min: 1, max: roll.die, replacement: true})
      .then((result) => {
        var res = 0;
        result.random.data.forEach((val) => {
          console.log("Val: %s", val)
          res += val;
        })
        roll.res = res + roll.mod;
        console.log("n: %s", rolls[i].n)
        this.setState({rolls})//Must update state or else data is lost, generateIntegers is async
      })
      .catch(e => {
        console.log(e)
      })
  }

  rollD20(rolls, i) {
    var roll = rolls[i]
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
    random.generateIntegers({ n: roll.n, min: 1, max: 20, replacement: true})
      .then((result) => {
        var arr = result.random.data
        var res;
        if(arr.length === 1){
          var message = arr[0] === 20 ? ' \u2618': (arr[0] === 1 ? ' \u2620' : '') ;
          res = arr[0] + roll.mod + message
        }
        else {
          var res = " (";
          arr.forEach((val) => {
            console.log("Val: %s", val)
            res += val + roll.mod + ', ';
          })
          res = res.slice(0, -2)
          res += ')';
        }

        roll.res = res;
        this.setState({rolls})//Must update state or else data is lost, generateIntegers is async
      })
      .catch(e => {
        console.log(e)
      })
  }

  async rollAdvantage(rolls, i) {
    var roll = rolls[i]
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
    random.generateIntegers({ n: 2, min: 1, max: 20, replacement: true})
      .then((result) => {
        var arr = result.random.data
        var res = arr[0] >= arr[1] ? arr[0] : arr[1];
        roll.n = 1;
        roll.res = (res + roll.mod) + " (" + arr[0] + ", " + arr[1] + ")";
        this.setState({rolls})//Must update state or else data is lost, generateIntegers is async
      })
      .catch(e => {
        console.log(e)
      })
  }

  rollDisadvantage(rolls, i) {
    var roll = rolls[i]
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
    random.generateIntegers({ n: 2, min: 1, max: 20, replacement: true})
      .then((result) => {
        var arr = result.random.data
        var res = arr[0] <= arr[1] ? arr[0] : arr[1];
        roll.n = 1;
        roll.res = (res + roll.mod) + " (" + arr[0] + ", " + arr[1] + ")";
        this.setState({rolls})//Must update state or else data is lost, generateIntegers is async
      })
      .catch(e => {
        console.log(e)
      })
  }

  rollCritical(rolls, i) {
    var roll = rolls[i]
    var random = new randomAPI({apiKey: '61804754-7dfe-4259-9e1b-7dc2ca110a00'})
    random.generateIntegers({ n: roll.n * 2, min: 1, max: roll.die, replacement: true})
      .then((result) => {
        var data = result.random.data
        // var standard = data.subset(0, data.length/2)
        // var critical = data.subset((data.length/2)+1, data.length)
        var res = 0;
        data.forEach((val) => {
          res += val;
        })      

        roll.res = res + roll.mod;
        this.setState({rolls})//Must update state or else data is lost, generateIntegers is async
      })
      .catch(e => {
        console.log(e)
      })
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

    var diceCallback = (die, update) => {
      if(die.hidden){
        rolls.splice(die.nth, 1);
        this.setState(rolls);
      }
      else if(update){
        rolls[die.nth] = die;
        this.setState({rolls});
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
            <Dice 
              key={key} 
              nth={key} 
              n={roll.n} 
              die={roll.die}
              mod={roll.mod} 
              res={roll.res}
              advantage={roll.advantage}
              disadvantage={roll.disadvantage}
              critical={roll.critical} 
              removable={true}
              callback={diceCallback}
            />
          )
        })
        return dice;
      } 
      else {
        var roll = rolls[0];
        console.log(roll)
        return <Dice 
                nth={0} 
                n={roll.n} 
                die={roll.die}
                mod={roll.mod} 
                res={roll.res}
                advantage={roll.advantage}
                disadvantage={roll.disadvantage}
                critical={roll.critical}
                callback={diceCallback}nth={0} n={roll.n} die={roll.die} mod={roll.mod} res={''+roll.res} callback={diceCallback}
              />
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
              <Button onClick={() => {this.rollDice(rolls)}} block={true}>
                Roll
              </Button>
            </Row>
          </Col>
        </Row>
      </Fragment>
    )
  }
}