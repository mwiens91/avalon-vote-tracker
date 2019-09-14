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

const INITIAL_STATE = {
  numPlayers: 5,
  players: ["player1", "player2", "player3", "player4", "player5"],
  playersLocked: false,
  quests: [[{ missionLeader: 0 }]],
};

class App extends Component {
  constructor(props) {
    super(props);

    this.minPlayers = 5;
    this.maxPlayers = 10;
    this.state = INITIAL_STATE;

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(INITIAL_STATE);
  }

  addPlayer() {
    // Don't add a player if the player number is maxed out
    if (this.state.numPlayers >= this.maxPlayers) {
      return;
    }

    this.setState({
      numPlayers: this.state.numPlayers + 1,
      players: [...this.state.players, `player${this.state.numPlayers + 1}`],
    });
  }

  removePlayer() {
    // Don't add a player if the player number is maxed out
    if (this.state.numPlayers <= this.minPlayers) {
      return;
    }

    this.setState({
      numPlayers: this.state.numPlayers - 1,
      players: this.state.players.slice(0, this.state.numPlayers - 1),
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Avalon vote tracker</h1>

        <div>
          <FontAwesomeIcon icon="lock" />
          <FontAwesomeIcon icon="lock-open" />

          <button onClick={this.addPlayer}>
            <FontAwesomeIcon icon="plus" /> add player
          </button>

          <button onClick={this.removePlayer}>
            <FontAwesomeIcon icon="minus" /> remove player
          </button>

          <button onClick={this.resetState}>
            <FontAwesomeIcon icon="redo" /> reset
          </button>
        </div>

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
