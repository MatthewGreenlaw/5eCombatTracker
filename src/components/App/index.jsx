import React, {Fragment} from 'react';
import {
  Row,
  Col,
  Container,
} from 'reactstrap'
import DiceRoller from './../DiceRoller'
import InitTracker from './../InitTracker'

const App = () => (
  <Fragment >
    <DiceRoller/>
    <Container>
      <InitTracker players={[{name: 'Theron', init: 1},{name: 'Theron', init: 1}]}/>
    </Container>

  </Fragment>
);

export default App;
