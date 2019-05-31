import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
} from 'reactstrap'
import './styles.css'

export default class InitTracker extends React.Component {
  static propTypes = {
    players: PropTypes.array,
}

  render(){
    var arr = [];

    this.props.players.forEach((player)=>{
      arr.push(
        <tr>
          <td>{player.name}</td>
          <td>{player.init}</td>
        </tr>
      )
    })
    return(
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initiative</th>
          </tr>
        </thead>
        <tbody>
          {arr}
        </tbody>
      </Table>
    )
  }

}
