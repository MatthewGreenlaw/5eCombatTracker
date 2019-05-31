import React, {Fragment} from 'react'
import {
  Button,
  Form, FormGroup,
  Label, Input,
  Row, Col,
} from 'reactstrap'

import { generateIntegers } from "./../utils/randomNumberGenerator";

export default class AttackRoller extends React.Component {

  render () {
    var advantage = false;
    var disadvantage = false;
    var n = 1;
    var die = 20;
    var modifier = 0;

    var callback = () => {
      console.log("AttackRoller => n: %s, die: %s, mod: %s", n, die, modifier)
      generateIntegers(
        (vals) => {
          this.props.callback(vals[0] + +modifier)
        },
        { n: n, min: 1, max: die, replacement: true }
      )
    }

    var displayModifiers = () => {
      return (
        <Form>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={() => advantage = !advantage}
                checked={advantage}
              />{" "}
              Advantage{" "}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={() => disadvantage = !disadvantage}
                checked={disadvantage}
              />{" "}
              Disadvantage{" "}
            </Label>
          </FormGroup>
        </Form>
      );
    };

    var displayAttackRoll = () => {
      n = 1;
      die = 20;
      return (
        <Form inline>
          <Button onClick={callback} style = {{marginRight: '1em'}}>
            Attack
          </Button>
          {' + '}
          <Input
            type="number"
            onChange={value => modifier = +value}
            placeholder={modifier}
          />
        </Form>
      )
    }

    var displayHealRoll = () => {
      n = 1;
      die = 4;
      return (
        <Form inline>
          <Button onClick={callback} style = {{marginRight: '1em'}}>
            Heal
          </Button>
          <Label>
            <Input
              type="number"
              onChange={e => n = +e.target.value}
              className={"width-sm"}
            placeholder={1}/>
            {" d "}
          </Label>
          <Label>
            <Input
              type="select"
              onChange={e => die = +e.target.value}
              placeholder={die}
            >
              <option>4</option>
              <option>6</option>
              <option>8</option>
              <option>10</option>
            </Input>
            {" + "}
          </Label>
          <Input
            type="number"
            onChange={e => modifier = e.target.value}
            placeholder={modifier}
          />
        </Form>
      )
    }

    if(this.props.action.toLowerCase() === 'attack'){
      return (
        <Fragment>
          <Row>
            <Col xs='4'>
              {displayModifiers()}
            </Col>

            <Col xs='8'>
              {displayAttackRoll()}
            </Col>
          </Row>
        </Fragment>
      )
    }
    else if (this.props.action.toLowerCase() === 'heal'){
      return (
        <Fragment>
          <Row>
            <Col xs='12'>
              {displayHealRoll()}
            </Col>
          </Row>
        </Fragment>
      )
    }
    else{
      return null
    }
  }
}
