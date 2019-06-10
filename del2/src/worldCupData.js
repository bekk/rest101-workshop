const fs = require('fs');
const values = require('object.values');

if (!Object.values) {
  values.shim();
}

const formatMatches = (unformattedMatches) => unformattedMatches.map((m, idx) => {
  return (
    {
      matchCategory: m.stage_name,
      name: idx,
      fifa_id: m.fifa_id,
      home_team: m.home_team.code,
      away_team: m.away_team.code,
      home_result: m.home_team.goals,
      away_result: m.away_team.goals,
      date: m.datetime,
      channels: [
          4,
          6,
          13
      ],
      finished: m.status === "completed",
    });
});


const formatTeams = (unformattedTeams) => unformattedTeams.map((t, idx) => {
  return (
    {
      id: t.id,
      name: t.country,
      country: t.country,
      fifaCode: t.fifa_code,
      flag: t.flag,
      emoji: t.emoji_code,
      emojiString: t.emojiString,
      group_letter: t.group_letter
    }
  );
});


// Preparing data
const worldcupData = JSON.parse(fs.readFileSync("./data/worldcup2018.json", "utf8"));
const teams2019Json = JSON.parse(fs.readFileSync("./data/teams2019.json", "utf-8"));
const matches2019Json = JSON.parse(fs.readFileSync("./data/matches2019.json", "utf-8"));

const teams = formatTeams(teams2019Json);
const matches = formatMatches(matches2019Json);
const channels = Object.values(worldcupData.tvchannels);

module.exports = {
  teams,
  matches,
  channels
}