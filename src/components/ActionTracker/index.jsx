import React, {Fragment} from 'react'
import {
  Container,
  Label, Input,
  Col, Row,
  Toast, ToastHeader, ToastBody,
  Card, CardHeader, CardBody,
  FormGroup,
} from 'reactstrap'

import AttackRoller from './../AttackRoller'

export default class ActionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket
    this.type = this.socket.io.opts.query.type
    this.name = this.props.name


    this.socket.on('actionFromServer', (data) => {
      var action;
      if (data.action === 'Damage')
        action = "damaged"
      else
        action = data.action.toLowerCase()+'ed'

      var log = data.player + ' '+ action + ' '+ data.target + ' for ' + data.roll
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
        this.socket.compress(false).emit('actionFromPlayer',
          {
            id: this.socket.id,
            player: this.props.name,
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

    var setAction = (option) => {
      var action = option.target.value
      this.setState({action})
    }

    var setTarget = (option) => {
      var target = option.target.value
      this.setState({target})
    }

    var targetOptions = () => {
      return this.state.targets.map((die, i) => {return <option key={i}>{die}</option>})
    }
    return (
      <Fragment>

        <Toast>
          <ToastHeader>{"Log: " + (this.state.log === undefined ? 'Welcome' : this.state.log)}</ToastHeader>
          <ToastBody>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label>Action</Label>
                  <Input
                    onChange={setAction}
                    type="select"
                    placeholder={"Attack"}
                  >
                    <option>Attack</option>
                    <option>Damage</option>
                    <option>Heal</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label> Target </Label>
                  <Input
                    onChange={setTarget}
                    type="select"
                  >
                  <option value=''>Select a Target</option>
                    {targetOptions()}

                  </Input>
                </FormGroup>
              </Col>



            </Row>
            <Row>
              <Col>
                {this.state.target.length > 0 ? <AttackRoller rollerCallback={rollerCallback} action={this.state.action}/> : null}
              </Col>
            </Row>
          </ToastBody>
        </Toast>


      </Fragment>
    )
  }
}
