import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faLockOpen,
  faMinus,
  faPlus,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Load Font Awesome icons
library.add(faLock, faLockOpen, faMinus, faPlus, faRedo);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: ["player1", "player2", "player3", "player4", "player5"],
      playersLocked: false,
      quests: [],
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Avalon vote tracker</h1>
        <FontAwesomeIcon icon="lock" />
        <FontAwesomeIcon icon="lock-open" />
        <FontAwesomeIcon icon="plus" />
        <FontAwesomeIcon icon="minus" />
        <FontAwesomeIcon icon="redo" />
        <br />

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "300px" }}></th>
              {this.state.players.map(name => (
                <th style={{ width: "*" }}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>useful text here</td>
              {this.state.players.map(_ => (
                <td style={{ textAlign: "center" }}>hey</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
