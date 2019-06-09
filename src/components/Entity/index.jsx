import React from 'react'
import {
  Container,
  Col, Row,
  Toast, ToastHeader, ToastBody
} from 'reactstrap'
import HealthTracker from './../HealthTracker'
import ActionTracker from './../ActionTracker'

export default class Entity extends React.Component {
  componentDidMount () {
    this.props.socket.emit("addTarget", {
      name: this.props.name,
    })
  }

  // componentWillUnmount() {
  //   this.props.socket.emit("removeTarget", {
  //     name: this.props.name,
  //     id: this.props.socket.id,
  //   })
  // }

  render(){
    return (
      <Container>
        <Toast style={{height: "93%"}}>
          <ToastHeader>
            {this.props.name + " (AC: "+ this.props.ac+ ")"}
          </ToastHeader>
          <ToastBody>
            <Row>
              <Col xs="3">
                <HealthTracker name={this.props.name} ac={this.props.ac} max={this.props.maxHP} socket={this.props.socket}/>
              </Col>
              <Col>
                <ActionTracker name={this.props.name} socket={this.props.socket}/>
              </Col>
            </Row>
          </ToastBody>
        </Toast>
      </Container>
    )
  }
}
