import React from 'react';
import MatchDay from './MatchDay';
import groupBy from './../../utils/helpers';
import { getMatches } from './../../dataStore/staticData';

class MatchSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const matchesGroupedByDay = groupBy(getMatches(), match =>
      match.date.slice(0, 10)
    );
    const matchesGroupedByDaySorted = [...matchesGroupedByDay.entries()]
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(day => {
        day[1] = day[1].sort(
          (matchA, matchB) => new Date(matchA.date) - new Date(matchB.date)
        );
        return day;
      });

    return (
      <article className="matchSchedule">
        <h2>Alle kamper</h2>
        <section id="matchSchedule-list" className="matchSchedule-list">
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
        </section>
      </article>
    );
  }
}

export default MatchSchedule;
