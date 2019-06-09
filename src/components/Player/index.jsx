import React, {Fragment} from 'react'
import PropTypes from "prop-types"
import {
  Row, Col,
  Button,
  Toast, ToastHeader, ToastBody
} from 'reactstrap'
import InitTracker from './../InitTracker'
import Entity from './../Entity'
import Log from './../Log'

export default class Player extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    playerData: PropTypes.object.isRequired,
  }

  render() {

    return (
      <Fragment>
        <Row>
          <Col>
            <InitTracker socket={this.props.socket} style={{minHeight: "90%"}}/>
          </Col>
          <Col>
            <Toast style={{minHeight: "90%"}}>
              <ToastHeader>Combat Log</ToastHeader>
              <ToastBody>
                <Log socket={this.props.socket}/>
              </ToastBody>
            </Toast>
          </Col>
        </Row>
        <Row>
          <Entity
            name={this.props.playerData.name}
            ac={this.props.playerData.ac}
            maxHP={this.props.playerData.maxHP}
            socket={this.props.socket}
          />
        </Row>
      </Fragment>
    )
  }
}
