import React from 'react'
import {
  Container,
  Label, Input,
  Col, Row,
  Toast, ToastHeader, ToastBody,
  Card, CardHeader, CardBody,
} from 'reactstrap'
import HealthTracker from './../HealthTracker'
import ActionTracker from './../ActionTracker'

export default class Entity extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket
  }

  componentDidMount () {
    console.log("Adding %s", this.props.name)
    this.socket.emit("addTargets", [this.props.name])
  }

  // componentWillUnmount() {
  //   console.log("Removing %s", this.props.name)
  //   this.socket.emit("removeTarget", this.props.name)
  // }

  render(){
    return (
      <Container>
        <Card style={{height: "93%"}}>
          <CardHeader>
            {this.props.name}
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="3">
                <HealthTracker character={this.props.name} ac={this.props.ac} max={this.props.maxHP} socket={this.socket}/>
              </Col>
              <Col>
                <ActionTracker player={this.props.name} socket={this.socket}/>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}
