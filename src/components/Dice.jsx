import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Button,
  Toast, ToastHeader, ToastBody, Fade,
  Container, Row, Col,
  Form, FormGroup, Label, Input,  
} from 'reactstrap'
import './styles.css'

var RandomOrg = require('random-org');

export default class DiceRoller extends React.Component {
  static propTypes = {
    nth: PropTypes.number,
    n: PropTypes.number,
    die: PropTypes.number,
    mod: PropTypes.number,
    res: PropTypes.number,
    removable: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.hide = this.hide.bind(this)

    this.state = {
      nth: this.props.nth,
      n: this.props.n,
      die: this.props.die,
      mod: this.props.mod,
      res: this.props.res,
      hidden: false,
    }
  }

  async setN(n) {
    await this.setState({n})
    this.props.callback({
      nth: this.state.nth,
      n: n,
      die: this.state.die,
      mod: this.state.mod,
      res: this.state.res,
      hidden: this.state.hidden,
    });
  }

  async setDie(die) {
    await this.setState({die})
    this.props.callback({
      nth: this.state.nth,
      n: this.state.n,
      die: die,
      mod: this.state.mod,
      res: this.state.res,
      hidden: this.state.hidden,
    });
  }

  async setMod(mod) {
    await this.setState({mod})
    this.props.callback({
      nth: this.state.nth,
      n: this.state.n,
      die: this.state.die,
      mod: mod,
      res: this.state.res,
      hidden: this.state.hidden,
    });
  }

  async hide() {
    await this.setState({hidden: true})
    this.props.callback({
      nth: this.state.nth,
      n: this.state.n,
      die: this.state.die,
      mod: this.state.mod,
      res: this.state.res,
      hidden: true,
    });
  }

  render () {

    var attackDie = () => {
      return (
        <Form inline>
          <FormGroup check>
            <Label check sm={2}><Input type="checkbox"/> Advantage </Label>
          </FormGroup>
          <FormGroup check>
            <Label check sm={2}><Input type="checkbox"/> Disadvantage </Label>
          </FormGroup>
        </Form>
      )
    }

    var criticalDie = () => {
      return (
        <Form inline>
          <FormGroup check>
            <Label check sm={2}>
              <Input type="checkbox" />{' '}
              Critical
            </Label>
        </FormGroup>
      </Form>
      )
    }

    var dieType = () => {
      return this.state.die === 20 ? attackDie() : criticalDie();
    }

    //{this.props.removable ? <Button close onClick={this.hide} /> : null}
      return(
        <Toast fade={ false }>
          <ToastHeader toggle={this.props.removable ? this.hide : null}>
            {dieType()}
          </ToastHeader>
          <ToastBody>
            <Container>
            </Container>
            <Form inline>
              <FormGroup inline>
                <Row>
                  <Label>
                    <Input type="number" onChange={e => this.setN(+e.target.value)} placeholder={this.state.n}/>
                    {' d '} 
                  </Label>
                  <Label>
                    <Input type="select" onChange={e => this.setDie(+e.target.value)} placeholder={this.state.die}>
                      <option>4</option>
                      <option>6</option>
                      <option>8</option>
                      <option>10</option>
                      <option selected="selected">20</option>
                    </Input>
                    {' + '}
                  </Label>
                  <Label>
                    <Input type="number" onChange={e => this.setMod(+e.target.value)} placeholder={this.state.mod}/>
                    {' = '}
                    <Input type="text" value={this.props.res} readOnly/>
                  </Label>
                </Row>
              </FormGroup>
            </Form>
          </ToastBody>
        </Toast>
      )
  }
}