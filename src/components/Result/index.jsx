import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Table,
} from 'reactstrap'
import './styles.css'

export default class Result extends React.Component {
  static propTypes = {
    outcome: PropTypes.string,
    action: PropTypes.string,
    target: PropTypes.string,
    amt: PropTypes.number,
    val: PropTypes.string,
}

  render(){
    return(
      <Table>
        <thead>
          <tr>
            <th>Log:</th>
            <th>{this.props.outcome}</th>
            <th>You {this.props.action} {this.props.target} for {this.props.amt} {this.props.val}</th>
          </tr>
        </thead>
      </Table>
    )
  }

}
