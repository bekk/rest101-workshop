import React from 'react';
import moment from 'moment';

const Match = props => {
  return (
    <section className="matchSchedule-match">
      <div className="row">
        <div className="col-sm">
          <span className="matchSchedule-match-time">
            {moment(new Date(props.match.date)).format('HH:mm')}
          </span>
        </div>
        <div className="col-sm">
          <span className={`matchSchedule-match-goals ${props.homeGoals > props.awayGoals ? 'matchSchedule-match-winner' : ''}`}>
            {props.homeGoals}
          </span>
          <span className="matchSchedule-match-flag">
            {props.homeTeamEmoji}
          </span>
          <span className="matchSchedule-match-name">{props.homeTeam}</span>
          <br />
          <span className={`matchSchedule-match-goals ${props.homeGoals < props.awayGoals ? 'matchSchedule-match-winner' : ''}`}>
            {props.awayGoals}
          </span>
          <span className="matchSchedule-match-flag">
            {props.awayTeamEmoji}
          </span>
          <span className="matchSchedule-match-name">{props.awayTeam}</span>
        </div>
        <div className="col-sm">
          <button
            className="matchSchedule-addMatch btn"
            onClick={() => props.saveMatch(props.match.name)}
          >
            Legg til
          </button>
        </div>
      </div>
    </section>
  );
};

export default Match;
