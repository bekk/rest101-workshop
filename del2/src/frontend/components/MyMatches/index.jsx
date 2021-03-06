import React from 'react';
import SavedMatch from './SavedMatch';

class MyMatches extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hasSavedMatches =
      this.props.savedMatches && this.props.savedMatches.length > 0;
    function noSavedMatches() {
      return <span>Du har ikke lagt til noen kamper enda.</span>;
    }

    return (
      <article className="savedMatches">
        <h2>Dine kamper</h2>
        {hasSavedMatches &&
          this.props.savedMatches.map(match => {
            return (
              <SavedMatch
                key={match.matchId}
                matchId={match.matchId}
                removeMatch={this.props.removeMatch}
              />
            );
          })}
        {!hasSavedMatches && noSavedMatches()}
      </article>
    );
  }
}

export default MyMatches;
