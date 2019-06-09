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
import NewMonsterForm from "./../NewMonsterForm"

export default class DungeonMaster extends React.Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
  }

  constructor(props){
    super(props)

    this.socket = this.props.socket
    this.name = this.socket.io.opts.query.name

    this.state = {
      addingMonsters: false,
      monsters: [],
      targets: [],
    }
  }

  render() {
    var addMonster = () => {
      var addingMonsters = !this.state.addingMonsters
      this.setState({addingMonsters})
    }

    var newMonsterCallback = (data) => {
      var monsters = this.state.monsters
      var newMonster = <Entity
        name={data.name}
        ac={data.ac}
        maxHP={data.maxHP}
        socket={this.props.socket}
      />

      monsters.push(newMonster);
      this.setState({
        addingMonsters: !this.state.addingMonsters,
        monsters: monsters
      })
    }

    return (
      <Fragment>
        <Row>
          <Col><InitTracker name={this.props.name} socket={this.props.socket} players={[]} style={{height: "90%"}}/></Col>
          <Col><Toast style={{minHeight: "90%"}}><ToastHeader>Combat Log</ToastHeader><ToastBody>
            <Log socket={this.props.socket}/>
          </ToastBody></Toast></Col>
        </Row>
        <Row>
          {this.state.addingMonsters ? <NewMonsterForm lobby={this.socket.query.lobby} callback={newMonsterCallback}/> : this.state.monsters}
          <Button onClick={addMonster} block={true}>+ Add monster</Button>
        </Row>
      </Fragment>
    )
  }
}
