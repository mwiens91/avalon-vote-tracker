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
  faUserSlash,
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
  faUser,
  faUserSlash
);

const MISSION_IN_PROGRESS = "in progress";
const MISSION_REJECTED = "rejected";
const MISSION_FAILED = "failed";
const MISSION_SUCCESSFUL = "successful";

const getTableRowColor = missionState => {
  if (missionState === MISSION_REJECTED) {
    return "#ededed";
  } else if (missionState === MISSION_FAILED) {
    return "#ffd6d6";
  } else if (missionState === MISSION_SUCCESSFUL) {
    return "#c2ffd0";
  }

  return "#deecf7";
};

const INITIAL_MISSION_STATE = {
  leader: 0,
  missionNumber: 1,
  selectionNumber: 1,
  state: MISSION_IN_PROGRESS,
  approves: Array(5).fill(true),
  onTeam: Array(5).fill(false),
};

const INITIAL_STATE = {
  inProgress: false,
  locked: false,
  numPlayers: 5,
  players: Array(5).fill(""),
  playersLocked: false,
  missions: [INITIAL_MISSION_STATE],
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

    this.setState(
      {
        numPlayers: this.state.numPlayers + 1,
        players: [...this.state.players, ""],
        missions: [
          {
            ...INITIAL_MISSION_STATE,
            approves: Array(this.state.numPlayers + 1).fill(true),
            onTeam: Array(this.state.numPlayers + 1).fill(false),
          },
        ],
      },
      () => console.log(this.state)
    );
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
          ...INITIAL_MISSION_STATE,
          approves: Array(this.state.numPlayers - 1).fill(true),
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

  modifyMissionOnTeam(missionIdx, playerIdx, val) {
    this.setState({
      missions: [
        ...this.state.missions.slice(0, missionIdx),
        {
          ...this.state.missions[missionIdx],
          onTeam: [
            ...this.state.missions[missionIdx].onTeam.slice(0, playerIdx),
            val === "true" ? true : false,
            ...this.state.missions[missionIdx].onTeam.slice(playerIdx + 1),
          ],
        },
        ...this.state.missions.slice(missionIdx + 1),
      ],
    });
  }

  modifyMissionApproves(missionIdx, playerIdx, val) {
    this.setState({
      missions: [
        ...this.state.missions.slice(0, missionIdx),
        {
          ...this.state.missions[missionIdx],
          approves: [
            ...this.state.missions[missionIdx].approves.slice(0, playerIdx),
            val === "true" ? true : false,
            ...this.state.missions[missionIdx].approves.slice(playerIdx + 1),
          ],
        },
        ...this.state.missions.slice(missionIdx + 1),
      ],
    });
  }

  modifyMissionState(missionIdx, val, callback = null) {
    this.setState(
      {
        missions: [
          ...this.state.missions.slice(0, missionIdx),
          {
            ...this.state.missions[missionIdx],
            state: val,
          },
          ...this.state.missions.slice(missionIdx + 1),
        ],
      },
      callback
    );
  }

  addMission() {
    let previousMission = this.state.missions[this.state.missions.length - 1];

    // We should never be here if the previous mission is still in
    // progress
    if (previousMission.state === MISSION_IN_PROGRESS) {
      throw new Error("adding new mission while mission still in progress");
    }

    // Don't allow the following:
    // - over 5 rejected selections
    // - more than 3 failed missions or 3 successful missions
    if (
      (previousMission.state === MISSION_REJECTED &&
        previousMission.selectionNumber === 5) ||
      this.state.missions.reduce(
        (count, currMission) =>
          currMission.state === MISSION_FAILED ? count + 1 : count,
        0
      ) >= 3 ||
      this.state.missions.reduce(
        (count, currMission) =>
          currMission.state === MISSION_SUCCESSFUL ? count + 1 : count,
        0
      ) >= 3
    ) {
      return;
    }

    this.setState({
      missions: [
        ...this.state.missions,
        {
          leader: (previousMission.leader + 1) % this.state.numPlayers,
          missionNumber:
            previousMission.state === MISSION_REJECTED
              ? previousMission.missionNumber
              : previousMission.missionNumber + 1,
          selectionNumber:
            previousMission.state === MISSION_REJECTED
              ? previousMission.selectionNumber + 1
              : 1,
          state: MISSION_IN_PROGRESS,
          approves: Array(this.state.numPlayers).fill(true),
          onTeam: Array(this.state.numPlayers).fill(false),
        },
      ],
    });
  }

  removeCurrentMission() {
    this.setState({
      missions: [
        ...this.state.missions.slice(0, this.state.missions.length - 2),
        {
          ...this.state.missions[this.state.missions.length - 2],
          state: MISSION_IN_PROGRESS,
        },
      ],
    });
  }

  isReadyToStart() {
    return this.state.players.every(name => name !== "");
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div style={{ padding: "0 0.69em" }}>
          <h1 style={{ fontSize: "53px", marginTop: "0.6em" }}>
            Avalon vote tracker
          </h1>

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
              <th style={{ height: "4em", width: "250px" }}></th>
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
            {this.state.missions.map((mission, missionIdx) => (
              <tr style={{ backgroundColor: getTableRowColor(mission.state) }}>
                <td>
                  <div style={{ fontWeight: "bold" }}>
                    mission {mission.missionNumber} > selection{" "}
                    {mission.selectionNumber}
                  </div>
                  <div>
                    <FontAwesomeIcon icon="crown" />{" "}
                    {this.state.players[mission.leader]}
                  </div>
                  <br />
                  <div>
                    <select
                      className="form-select"
                      style={{ maxWidth: "150px" }}
                      disabled={!this.state.inProgress}
                      value={this.state.missions[missionIdx].state}
                      onChange={e => {
                        this.modifyMissionState(
                          missionIdx,
                          e.currentTarget.value,
                          this.addMission
                        );
                      }}
                    >
                      <option value={MISSION_IN_PROGRESS}>
                        {MISSION_IN_PROGRESS}
                      </option>
                      <option value={MISSION_REJECTED}>
                        {MISSION_REJECTED}
                      </option>
                      <option value={MISSION_FAILED}>{MISSION_FAILED}</option>
                      <option value={MISSION_SUCCESSFUL}>
                        {MISSION_SUCCESSFUL}
                      </option>
                    </select>
                  </div>
                </td>
                {this.state.players.map((_, playerIdx) => (
                  <td style={{ textAlign: "center" }}>
                    {mission.state === MISSION_IN_PROGRESS ? (
                      <span>
                        <div
                          style={{
                            maxWidth: "150px",
                            margin: "auto",
                            paddingBottom: "10px",
                          }}
                        >
                          <select
                            className="form-select"
                            value={
                              this.state.missions[missionIdx].onTeam[playerIdx]
                            }
                            onChange={e =>
                              this.modifyMissionOnTeam(
                                missionIdx,
                                playerIdx,
                                e.currentTarget.value
                              )
                            }
                          >
                            <option value={false}>off mission</option>
                            <option value={true}>on mission</option>
                          </select>
                        </div>
                        <div style={{ maxWidth: "150px", margin: "auto" }}>
                          <select
                            className="form-select"
                            value={
                              this.state.missions[missionIdx].approves[
                                playerIdx
                              ]
                            }
                            onChange={e =>
                              this.modifyMissionApproves(
                                missionIdx,
                                playerIdx,
                                e.currentTarget.value
                              )
                            }
                          >
                            <option value={true}>approve</option>
                            <option value={false}>reject</option>
                          </select>
                        </div>
                      </span>
                    ) : (
                      <span>
                        <div style={{ height: "2em" }}>
                          {this.state.missions[missionIdx].onTeam[
                            playerIdx
                          ] && <FontAwesomeIcon icon="user" />}
                        </div>
                        <div style={{ height: "2em" }}>
                          {this.state.missions[missionIdx].approves[
                            playerIdx
                          ] ? (
                            <FontAwesomeIcon icon="check" />
                          ) : (
                            <FontAwesomeIcon icon="times" />
                          )}
                        </div>
                      </span>
                    )}
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
