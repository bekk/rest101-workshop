import React from "react";
import MatchDay from "./MatchDay";

import groupBy from "./../../utils/helpers";

class MatchSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const matchesGroupedByDayAsMap = groupBy(this.props.matches, match =>
      match.date.slice(0, 10),
    );
    const matchesGroupedByDaySorted = [...matchesGroupedByDayAsMap.entries()]
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(day => {
        day[1] = day[1].sort(
          (matchA, matchB) => new Date(matchA.date) - new Date(matchB.date),
        );
        return day;
      });

    return (
      <section className="allMatches">
        <h2>Alle kamper</h2>
        <ul id="allMatches-list" className="allMatches-list">
          {matchesGroupedByDaySorted.map(day => {
            const date = day[0];
            const matchesThisDay = day[1];
            return (
              <MatchDay
                date={date}
                matches={matchesThisDay}
                teams={this.props.teams}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}

export default MatchSchedule;
