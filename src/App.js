import React, { Component, useCallback, useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faLockOpen,
  faMinus,
  faPlus,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// Load Font Awesome icons
library.add(faLock, faLockOpen, faMinus, faPlus, faRedo);

const INITIAL_STATE = {
  inProgress: false,
  locked: false,
  numPlayers: 5,
  players: ["player1", "player2", "player3", "player4", "player5"],
  playersLocked: false,
  quests: [[{ missionLeader: 0 }]],
};

const EditablePlayerName = ({ name, onChange }) => {
  const [editing, setEditing] = useState(false);
  const handleBodyClick = useCallback(() => setEditing(false), [setEditing]);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    return function cleanup() {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [handleBodyClick]);

  return (
    <span
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {editing ? (
        <input
          value={name}
          style={{ width: "8em" }}
          onChange={e => onChange(e.currentTarget.value)}
          onKeyPress={e => [13, 27].includes(e.keyCode) && setEditing(false)}
        />
      ) : (
        <span onClick={e => setEditing(true)}>{name}</span>
      )}
    </span>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.minPlayers = 5;
    this.maxPlayers = 10;
    this.state = INITIAL_STATE;

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
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
        <div style={{ paddingLeft: "0.69em" }}>
          <h1>Avalon vote tracker</h1>

          <div>
            {this.state.locked ? (
              <span>
                <button onClick={() => this.setState({ locked: false })}>
                  <FontAwesomeIcon icon="lock-open" /> unlock
                </button>
              </span>
            ) : (
              <span>
                <button onClick={() => this.setState({ locked: true })}>
                  <FontAwesomeIcon icon="lock" /> lock
                </button>
                &nbsp;
                {!this.state.inProgress && (
                  <span>
                    <button onClick={this.addPlayer}>
                      <FontAwesomeIcon icon="plus" /> add player
                    </button>
                    &nbsp;
                    <button onClick={this.removePlayer}>
                      <FontAwesomeIcon icon="minus" /> remove player
                    </button>
                    &nbsp;
                  </span>
                )}
                <button onClick={() => this.setState(INITIAL_STATE)}>
                  <FontAwesomeIcon icon="redo" /> reset
                </button>
              </span>
            )}
          </div>
        </div>

        <br />
        <br />

        <table>
          <thead>
            <tr>
              <th style={{ width: "300px" }}></th>
              {this.state.players.map((name, idx) => (
                <th key={idx.toString()} style={{ width: "8em" }}>
                  <EditablePlayerName
                    name={name}
                    onChange={v => console.log(v)}
                  />
                </th>
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
