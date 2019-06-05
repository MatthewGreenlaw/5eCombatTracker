import React, {Fragment} from 'react'
import {
  Container,
  Label, Input,
  Col, Row,
  Toast, ToastHeader, ToastBody,
  Card, CardHeader, CardBody,
} from 'reactstrap'

import AttackRoller from './../AttackRoller'

export default class ActionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket
    this.type = this.socket.io.opts.query.type

    if(this.type === "Player")
      this.name = this.socket.io.opts.query.name
    else
      this.name = this.props.name


    this.socket.on('actionFromServer', (data) => {
      var log = 'Log: ' + data.from + ' '+ data.action + 'ed ' + data.to + ' for ' + data.roll
      this.setState({log})
    })

    this.state = {
      target: '',
      targets: ["None"],
      action: 'Attack',
    }

  }

  render () {
    this.socket.on('updateTargets', targets => this.setState({targets}))

    var rollerCallback = (roll) => {
      if(this.state.target.length > 0){
        this.socket.emit('actionFromPlayer',
          {
            id: this.socket.id,
            name: this.name,
            target: this.state.target,
            action: this.state.action,
            roll: roll,
          }
        )
      }
      else {
        alert("Select a valid target")
      }
    }

    var setAction = (action) => {
      action = action.target.value
      this.setState({action})
    }

    var targetOptions = () => {
      return this.state.targets.map((die, i) => {return <option key={i}>{die}</option>})
    }
    return (
      <Fragment>
        <Row>
          <Label>
            Action
            <Input
              onChange={setAction}
              type="select"
              placeholder={"Attack"}
              style={{marginLeft: "0px"}}
            >
              <option>Attack</option>
              <option>Damage</option>
              <option>Heal</option>
            </Input>
          </Label>

          <Label style={{marginLeft:"1em"}}>
            Target
            <Input
              onChange={(option) => {this.setState({target: option.target.value})}}
              type="select"
              placeholder={"activeEntities"}
              style={{marginLeft: "0px"}}
            >
              {targetOptions()}

            </Input>
          </Label>
        </Row>
        <Row>
          <Col>
            {this.state.target.length > 0 ? <AttackRoller rollerCallback={rollerCallback} action={this.state.action}/> : null}
          </Col>
        </Row>
      </Fragment>
    )
  }
}
