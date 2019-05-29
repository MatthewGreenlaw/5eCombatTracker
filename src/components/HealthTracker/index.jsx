import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
} from 'reactstrap'
import './styles.css'

export default class HealthTracker extends React.Component {
  static propTypes = {

}

  render(){

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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arr}
        </tbody>
      </Table>
    )
  }
}
