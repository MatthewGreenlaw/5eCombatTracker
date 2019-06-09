import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import { generateIntegers } from "./../utils/randomNumberGenerator";
import {
  Table,
  Button,
  Input, Label,
  Toast, ToastBody, ToastHeader
} from 'reactstrap'
import './styles.css'

export default class InitTracker extends React.Component {
  static propTypes = {
    players: PropTypes.array,
    socket: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.socket = this.props.socket
    this.name = this.socket.io.opts.query.name

    this.state = {
      players: [],//this.props.players.sort((a, b) => {return b.init - a.init}),
      init: 0,
      modifier: 0,
    };

    this.socket.on("initiativeUpdate", players => this.setState({
      players: players.sort((a, b) => {return b.initiative - a.initiative})
    }));
  }

  render(){
    var playersRows = [];

    var rollInit = () => {
      generateIntegers(
        (vals) => {
          sendInit(vals[0] + this.state.modifier)
        },
        { n: 1, min: 1, max: 20, replacement: true }
      )
    }

    var sendInit = (newInit) => {
      this.socket.emit("updateInitiative", {
        id: this.socket.id,
        name: this.name,
        init: newInit
      });
    }

    var setInit = (e) => {
      var modifier = +e.target.value
      this.setState({modifier})
    }

    var displayInitRoller = () => {
      return (
        <Fragment>
        Modifier
        <Label>
          <Input
            type="number"
            onChange={setInit}
            placeholder={this.state.modifier}
            className={"diceInput"}
          />
        </Label>
          <Button
            onClick={rollInit}
            style = {{marginRight: '1em'}}
            block={true}
          > Roll Initiative </Button>
        </Fragment>
      )
    }

    this.state.players.forEach((player, i)=>{
      playersRows.push(
        <tr key={i}>
          <td>{player.name}</td>
          <td>{player.initiative}</td>
        </tr>
      )
    })

    return(
      <Toast>
        <ToastHeader>
          Initiative Tracker
        </ToastHeader>
        <ToastBody>
          <Table className={"table-dark table-striped"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Initiative</th>
              </tr>
            </thead>
            <tbody>
              {playersRows}
            </tbody>
          </Table>
          {displayInitRoller()}
        </ToastBody>
      </Toast>
    )
  }
}
