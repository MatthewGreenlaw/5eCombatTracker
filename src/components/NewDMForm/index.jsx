import React from 'react';
import PropTypes from "prop-types";
import {
  Form, FormGroup,
  Label, Input,
  Button, Jumbotron,
} from 'reactstrap'
import './style.scss'

export default class NewCharacterForm extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
  }

  render() {
    var lobby;

    var filledAllFields = () => {
      if (lobby === undefined
      )
        return false

      return true
    }

    var sendData = () => {
      if (filledAllFields()){
        this.props.callback(
          {
            lobby: lobby,
          }
        )
      }
      else{
        alert("Fill out all fields.")
      }
    }

    return (
      <Jumbotron>
        <Form>
          <FormGroup>
            <Label for="characterLobby">DM ID:</Label>
            <Input type="text" name="lobby" id="characterLobby" placeholder="Create an ID for your players..." onChange={e => lobby = e.target.value}/>
          </FormGroup>
          <Button onClick={sendData} block={true}>Submit</Button>
        </Form>
      </Jumbotron>

    )
  }
}
