import React from 'react'
import {
  Table,
} from 'reactstrap'

export default class Log extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      log: []
    }

    this.props.socket.on("logAction", (entry) => {
      var log = this.state.log
      log = log.concat([entry])
      if(log.length > 3)
        log.shift()

      this.setState({log})
    })
  }

  render() {
    var renderLogEntries = () => {
      console.log(this.state.log)
      return this.state.log.map((entry ,i) => {
        return (
          <tr key={i}>
            <td>{entry}</td>
          </tr>
        )
      })
    }
    return (
      <Table className={"table-dark table-striped"}>
        <tbody>
          {renderLogEntries()}
        </tbody>
      </Table>
    )
  }
}
