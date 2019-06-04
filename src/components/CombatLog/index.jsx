import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
} from 'reactstrap'
import './styles.css'

export default class CombatLog extends React.Component {
  static propTypes = {
    log: Proptypes.object,
    socket: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.socket = this.props.socket;

    this.state = {
       log: this.props.log;
    }
  }
  render(){

    this.socket.on('logFromServer', (log) => {
      this.setState({log});
    })

    return(
      <Table>
        <thead>
          <tr>
            <th>Log:</th>
            <th>{this.state.log.outcome}</th>
            <th>You {this.state.log.action} {this.state.log.target} for {this.state.amt} {this.state.log.val}</th>
          </tr>
        </thead>
      </Table>
    )
  }

}
