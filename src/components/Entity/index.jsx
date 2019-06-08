import React from 'react'
import {
  Container,
  Col, Row,
  Card, CardHeader, CardBody,
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
        <Card style={{height: "93%"}}>
          <CardHeader>
            {this.props.name}
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="3">
                <HealthTracker name={this.props.name} ac={this.props.ac} max={this.props.maxHP} socket={this.props.socket}/>
              </Col>
              <Col>
                <ActionTracker name={this.props.name} socket={this.props.socket}/>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    )
  }
}
