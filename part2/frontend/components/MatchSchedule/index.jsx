import React from "react";

import { getMatch } from "./../../utils/api";
import MatchDay from "./MatchDay";
import groupBy from "./../../utils/helpers";

import { getMatches, getTeams } from "./../../dataStore/staticData";

class MatchSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const allMatches = getMatches();
    const matchesGroupedByDay = groupBy(getMatches(), match => match.date.slice(0, 10));
    const matchesGroupedByDaySorted = [...matchesGroupedByDay.entries()]
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(day => {
        day[1] = day[1].sort((matchA, matchB) => new Date(matchA.date) - new Date(matchB.date));
        return day;
      });

    return (
      <section className="matchSchedule">
        <h2>Alle kamper</h2>
        <ul id="matchSchedule-list" className="matchSchedule-list">
          {matchesGroupedByDaySorted.map(day => {
            const date = day[0];
            const matchesThisDay = day[1];
            return (
              <MatchDay
                key={date}
                date={date}
                matchesThisDay={matchesThisDay}
                saveMatch={this.props.saveMatch}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}

export default MatchSchedule;
