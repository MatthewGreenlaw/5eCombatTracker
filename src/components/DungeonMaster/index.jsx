import React, {Fragment} from 'react'
import PropTypes from "prop-types"
import {
  Row, Col,
  Button,
  Toast, ToastHeader, ToastBody
} from 'reactstrap'
import InitTracker from './../InitTracker'
import Entity from './../Entity'

export default class DungeonMaster extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props)

    this.socket = this.props.socket
    this.name = this.socket.io.opts.query.name

    this.state = {
      monsters: [//hard coding for now...
        <Entity
          key={1}
          name={"Monster 1"}
          ac={18}
          maxHP={40}
          init={-1}
          socket={this.socket}
        />,
        <Entity
          key={2}
          name={"Monster 2"}
          ac={12}
          maxHP={35}
          init={2}
          socket={this.socket}
        />,
      ],
      targets: ["Monster 1", "Monster 2"],
    }
  }

  render() {

    var addMonster = () => {
      this.socket.emit("addTargets", this.state.targets)
    }

    return (
      <Fragment>
        <Row>
          <Col><InitTracker name={this.props.name} socket={this.props.socket} players={[]} style={{height: "90%"}}/></Col>
          <Col><Toast style={{minHeight: "90%"}}><ToastHeader>Combat Log</ToastHeader><ToastBody><i>@todo</i></ToastBody></Toast></Col>
        </Row>
        <Row>
          {this.state.monsters}
          <Button onClick={addMonster} block={true}>+ Add monster</Button>
        </Row>
      </Fragment>
    )
  }
}
