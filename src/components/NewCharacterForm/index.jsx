import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {
  Form, FormGroup, FormText,
  Label, Input, Option,
  Button,
} from 'reactstrap'
import './style.scss'

export default class NewCharacterForm extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    var name, ac, maxHP;

    var filledAllFields = () => {
      if (name === undefined ||
        ac === undefined ||
        maxHP === undefined
      )
        return false

      return true
    }

    var sendData = () => {
      if (filledAllFields()){
        this.props.callback(
          {
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
      <Form>
        <FormGroup>
          <Label for="characterName">Name:</Label>
          <Input type="text" name="name" id="characterName" placeholder="Name..." onChange={e => name = e.target.value}/>
        </FormGroup>
        <FormGroup>
          <Label for="characterAC">Armor Class:</Label>
          <Input type="number" name="ac" id="characterAC" placeholder="15, 12, 20..."onChange={e => ac = +e.target.value}/>
        </FormGroup>
        <FormGroup>
          <Label for="characterMaxHP">Maximum HP:</Label>
          <Input type="number" name="ac" id="characterMaxHP" placeholder="40, 20, 55..." onChange={e => maxHP = +e.target.value}/>
        </FormGroup>
        <Button onClick={sendData} block={true}>Submit</Button>
      </Form>
    )
  }
}
