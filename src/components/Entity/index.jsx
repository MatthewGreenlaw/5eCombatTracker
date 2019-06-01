import React from 'react'
import {
  Card,
  CardHeader,
  Label, Input,
  Col, Row,
} from 'reactstrap'
import AttackRoller from './../AttackRoller'

import io from 'socket.io-client';

export default class Entity extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket

    this.socket.on('actionFromServer', (data) => {
      var log = 'Log: ' + data.from + ' '+ data.action + 'ed ' + data.to + ' for ' + data.roll
      this.setState({log})
    })

    this.state = {
      target: '',
      action: 'Attack',
    }

  }


  render(){
    var log = '';
    var rollerCallback = (roll) => {
      if(this.state.target.length > 0){
        this.socket.emit('actionFromPlayer',
          {
            id: this.socket.id,
            name: this.props.name,
            target: this.state.target,
            action: this.state.action,
            roll: roll,
          }
        )
        log = "Log: " + this.props.name + ' ' + this.state.action + 'ed ' + this.state.target + ' for ' + roll
      }
      else {
        log = "Alert: Select a valid target"
      }
    }

    return (
      <Card>
        <CardHeader>
          {log}
        </CardHeader>
        <Row>
          <Col xs="2">
            Player Stats
          </Col>
          <Col xs="10">
            <Row>
              <Col>
                Action
                <Label>
                  <Input
                    onChange={(option) => {this.setState({action: option.target.value})}}
                    type="select"
                    placeholder={"Attack"}
                  >
                    <option>Attack</option>
                    <option>Heal</option>
                  </Input>
                </Label>
              </Col>
              <Col>
                Target
                <Label>
                  <Input
                    onChange={(option) => {this.setState({target: option.target.value})}}
                    type="select"
                    placeholder={"activeEntities"}
                  >
                    <option>List of activeEntities</option>
                    <option>test</option>
                  </Input>
                </Label>
              </Col>
            </Row>
            <AttackRoller callback={rollerCallback} action={this.state.action}/>
          </Col>
        </Row>
      </Card>
    )
  }
}
