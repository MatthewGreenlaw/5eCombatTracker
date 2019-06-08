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
    var name, ac, maxHP, lobby;

    var filledAllFields = () => {
      if (name === undefined ||
        ac === undefined ||
        maxHP === undefined ||
        lobby === undefined
      )
        return false

      return true
    }

    var sendData = () => {
      if (filledAllFields()){
        this.props.callback(
          {
            lobby: lobby,
            name: name,
            ac: ac,
            maxHP: maxHP,
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
            <Input type="text" name="lobby" id="characterLobby" placeholder="Ask the DM for their ID..." onChange={e => lobby = e.target.value}/>
          </FormGroup>
          <FormGroup>
            <Label for="characterName">Name:</Label>
            <Input type="text" name="name" id="characterName" placeholder="Your name..." onChange={e => name = e.target.value}/>
          </FormGroup>
          <FormGroup>
            <Label for="characterAC">Armor Class:</Label>
            <Input type="number" name="ac" id="characterAC" placeholder="Your armor class..."onChange={e => ac = +e.target.value}/>
          </FormGroup>
          <FormGroup>
            <Label for="characterMaxHP">Maximum HP:</Label>
            <Input type="number" name="ac" id="characterMaxHP" placeholder="Your maximum health points..." onChange={e => maxHP = +e.target.value}/>
          </FormGroup>
          <Button onClick={sendData} block={true}>Submit</Button>
        </Form>
      </Jumbotron>

    )
  }
}
