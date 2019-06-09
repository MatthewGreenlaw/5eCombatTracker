import React, {Fragment} from 'react'
import {
  Label, Input,
  Col, Row,
  Toast, ToastHeader, ToastBody,
  FormGroup,
} from 'reactstrap'

import AttackRoller from './../AttackRoller'

export default class ActionTracker extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket
    this.type = this.socket.io.opts.query.type
    this.name = this.props.name

    this.state = {
      target: {},
      targets: [],
      action: 'Attack',
    }
  }
  
  componentDidMount () {
    this.socket.on('targetUpdate', targets => this.setState({targets}))
  }

  render () {

    var rollerCallback = (roll) => {
      if(this.state.target.name.length > 0){
        this.socket.compress(false).emit('actionFromPlayer',
          {
            source: {
              name: this.props.name,
              id: this.socket.id
            },
            target: {
              name: this.state.target.name,
              id: this.state.target.id
            },
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
      var targets = this.state.targets
      var targetName = option.target.value
      var target = {};
      for (var i in targets){
        var _target = targets[i]
        if(_target.name === targetName){
          target = _target
          break;
        }
      }
      this.setState({target})
    }

    var targetOptions = () => {
      return this.state.targets.map((target, i) => {return <option key={i}>{target.name}</option>})
    }
    return (
      <Fragment>

        <Toast>
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
                {this.state.target.name !== undefined ? <AttackRoller rollerCallback={rollerCallback} action={this.state.action}/> : console.log(this.state.target)}
              </Col>
            </Row>
          </ToastBody>
        </Toast>
      </Fragment>
    )
  }
}
