import React from "react";
import ReactDOM from "react-dom";

import MatchSchedule from "./components/MatchSchedule";
import SavedMatches from "./components/MyMatches";
import MyMatches from "./components/MyMatches";

import api from "./utils/api";
import {
  setMatches,
  setTeams,
  deleteMatchFromSavedMatches,
} from "./dataStore/staticData";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      savedMatches: [],
    };
    this.addMatchToSavedMatches = this.addMatchToSavedMatches.bind(this);
    this.deleteMatchFromSavedMatches = this.deleteMatchFromSavedMatches.bind(
      this,
    );
  }

  componentDidMount() {
    Promise.all([
      api.getAllMatches(),
      api.getAllTeams(),
      api.getAllSavedMatches(),
    ]).then(result => {
      setMatches(result[0].matches);
      setTeams(result[1].teams);

      this.setState({
        savedMatches: result[2].savedMatches,
      });
    });
  }

  addMatchToSavedMatches(matchId) {
    api
      .saveMatch(matchId)
      .then(res => {
        this.setState(prevState => {
          return { savedMatches: [...prevState.savedMatches, res] };
        });
      })
      .catch(err => console.error(err));
  }

  deleteMatchFromSavedMatches(matchId) {
    api.deleteMatchFromSavedMatches(matchId).then(ok => {
      if (ok) {
        api.getAllSavedMatches().then(res => {
          this.setState({ savedMatches: res.savedMatches });
        });
      }
    });
  }

  render() {
    return (
      <main className="mainSection">
        <h1>VM-planlegger</h1>
        <MyMatches
          savedMatches={this.state.savedMatches}
          removeMatch={this.deleteMatchFromSavedMatches}
        />
        <MatchSchedule saveMatch={this.addMatchToSavedMatches} />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
