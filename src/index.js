import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import "./index.css";
import App from "./components/App";
import DiceRoller from "./components/DiceRoller";
import Entity from "./components/Entity";
import "bootstrap/dist/css/bootstrap.min.css";
import "./base-styles.scss";
//import * as serviceWorker from "./serviceWorker";

import openSocket from 'socket.io-client';
var socket = openSocket('http://localhost:3001', {query: "type=Player"})

function User () {
  return <Entity name={'matt'} players={[]} socket={socket}/>
}

ReactDOM.render(
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/roller/">Dice Roller</Link>
        </li>
        <li>
          <Link to="/player/">Player</Link>
        </li>
      </ul>
    </nav>
    <Route
      component={DiceRoller}
      path="/roller"
    />
    <Route
      path="/player"
      component={User}
    />
  </Router>
  , document.getElementById("root"));
//serviceWorker.register();
