import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCrown,
  faLock,
  faLockOpen,
  faMinus,
  faPlay,
  faPlus,
  faRedo,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import ButtonMenu from "./ButtonMenu";
import EditablePlayerName from "./EditablePlayerName";
import Footer from "./Footer";
import HelpMessage from "./HelpMessage";

// Load Font Awesome icons
library.add(
  faCheck,
  faCrown,
  faLock,
  faLockOpen,
  faMinus,
  faPlay,
  faPlus,
  faRedo,
  faTimes,
  faUser
);

const MISSION_IN_PROGRESS = "in progress";
// const MISSION_REJECTED = "rejected";
// const MISSION_FAILED = "failed";
// const MISSION_SUCCESSFUL = "success";

const INITIAL_STATE = {
  inProgress: false,
  locked: false,
  numPlayers: 5,
  players: ["", "", "", "", ""],
  playersLocked: false,
  missions: [
    {
      leader: 0,
      missionNumber: 1,
      selectionNumber: 1,
      status: MISSION_IN_PROGRESS,
      approves: Array(5).fill(false),
      onTeam: Array(5).fill(false),
    },
  ],
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
      players: [...this.state.players, ""],
      missions: [
        {
          leader: 0,
          missionNumber: 1,
          selectionNumber: 1,
          status: MISSION_IN_PROGRESS,
          approves: Array(this.state.numPlayers + 1).fill(false),
          onTeam: Array(this.state.numPlayers + 1).fill(false),
        },
      ],
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
      missions: [
        {
          leader: 0,
          missionNumber: 1,
          selectionNumber: 1,
          status: MISSION_IN_PROGRESS,
          approves: Array(this.state.numPlayers - 1).fill(false),
          onTeam: Array(this.state.numPlayers - 1).fill(false),
        },
      ],
    });
  }

  modifyPlayerName(playerIdx, newName) {
    this.setState({
      players: [
        ...this.state.players.slice(0, playerIdx),
        newName,
        ...this.state.players.slice(playerIdx + 1),
      ],
    });
  }

  isReadyToStart() {
    return this.state.players.every(name => name !== "");
  }

  render() {
    return (
      <div className="App">
        <div style={{ paddingLeft: "0.69em" }}>
          <h1>Avalon vote tracker</h1>

          <ButtonMenu
            inProgress={this.state.inProgress}
            isReady={this.isReadyToStart()}
            locked={this.state.locked}
            onAddPlayer={this.addPlayer}
            onRemovePlayer={this.removePlayer}
            onLock={() => this.setState({ locked: true })}
            onUnlock={() => this.setState({ locked: false })}
            onReset={() => this.setState(INITIAL_STATE)}
            onStart={() => this.setState({ inProgress: true })}
          />

          <HelpMessage
            isReady={this.isReadyToStart()}
            isInProgress={this.state.inProgress}
          />
        </div>

        <br />

        <table>
          <thead>
            <tr>
              <th style={{ width: "250px" }}></th>
              {this.state.players.map((name, idx) => (
                <th
                  key={idx.toString()}
                  style={{ width: "8em", height: "2em" }}
                >
                  <EditablePlayerName
                    name={name}
                    onChange={newName => this.modifyPlayerName(idx, newName)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.missions.map(mission => (
              <tr>
                <td>
                  <div style={{ fontWeight: "bold" }}>
                    mission {mission.missionNumber} > selection{" "}
                    {mission.selectionNumber}
                  </div>
                  <div>
                    <FontAwesomeIcon icon="crown" />{" "}
                    {this.state.players[mission.leader]}
                  </div>
                </td>
                {this.state.players.map(_ => (
                  <td style={{ textAlign: "center" }}>
                    <div style={{ paddingBottom: "10px" }}>
                      <FontAwesomeIcon icon="user" />
                    </div>
                    <div>
                      <FontAwesomeIcon icon="check" />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    );
  }
}

export default App;
