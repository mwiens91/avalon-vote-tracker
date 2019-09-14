import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  players: ["", "", "", "", ""],
  playersLocked: false,
  quests: [[{ missionLeader: 0 }]],
};

const EditablePlayerName = ({ name, onChange }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef(null);

  const handleBodyClick = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setEditing(false);
      }
    },
    [setEditing]
  );

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
          style={{ width: "5em" }}
          ref={ref}
          onChange={e => onChange(e.currentTarget.value)}
          onKeyPress={e =>
            ["Enter", "Escape"].includes(e.key) && setEditing(false)
          }
        />
      ) : (
        <span onClick={e => setEditing(true)}>
          {name.length >= 1 ? name : "<enter name>"}
        </span>
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
                <th
                  key={idx.toString()}
                  style={{ width: "8em", height: "2em" }}
                >
                  <EditablePlayerName
                    name={name}
                    onChange={newName =>
                      this.setState({
                        players: [
                          ...this.state.players.slice(0, idx),
                          newName,
                          ...this.state.players.slice(idx + 1),
                        ],
                      })
                    }
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

        <footer
          style={{
            position: "absolute",
            left: "0",
            bottom: "0",
            right: "0",
            paddingBottom: "20px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          created by{" "}
          <a
            href="https://github.com/mwiens91/"
            style={{ textDecoration: "none", color: "#0000EE" }}
          >
            Matt Wiens
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
