import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import InitTracker from './../InitTracker';
import Entity from './../Entity';
import CombatLog from './../CombatLog';
import {
  Jumbotron,
  Row,
  Col,

} from 'reactstrap'

export default class Player extends React.Component {
  static propTypes = {
    playerData: PropTypes.object,
    socket: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.playerData = this.props.playerData;
  }

  render (){
    console.log({this.props.playerData.name})
    return (<Jumbotron>
      <Row>
        <Col xs="2">
          <InitTracker socket={this.props.socket} players={[{id: 1, name: "test1", init: 1}, {id: 2, name: "test2", init: 2}]}/>
        </Col>
        <Col xs="10">
          <Row>
            <CombatLog socket={this.props.socket}/>
          </Row>
          <Row>
            <Entity
              name={this.state.playerData.name}
              ac={this.props.playerData.ac}
              maxHP={this.props.playerData.maxHP}
              init={this.props.playerData.init}
              socket={this.props.socket}
              />
          </Row>
        </Col>
      </Row>
    </Jumbotron>
    )
  }
}
