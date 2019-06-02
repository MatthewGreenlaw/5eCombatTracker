import React, {Fragment} from 'react';
import DiceRoller from './../DiceRoller'
import InitTracker from './../InitTracker'
import HealthTracker from './../HealthTracker'
import {
  Container,
} from 'reactstrap'

const App = () => (
  <Fragment >
    <DiceRoller/>
    <Container>
      <HealthTracker character={"player1"} ac={"18"} max={"40"}/>
    </Container>
  </Fragment>
);

export default App;
