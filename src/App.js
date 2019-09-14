import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: ["player1", "player2", "player3", "player4", "player5"],
      quests: {},
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Avalon vote tracker</h1>

        <table>
          <thead>
            <tr>
              <th></th>
              {this.state.players.map(name => (
                <th>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>useful text here</td>
              {this.state.players.map(_ => (
                <th>hey</th>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
