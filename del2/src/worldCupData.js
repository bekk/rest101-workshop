const fs = require('fs');
const values = require('object.values');

if (!Object.values) {
  values.shim();
}

// Read data
const teams2019Json = JSON.parse(fs.readFileSync("./data/teams2019.json", "utf-8"));
const matches2019Json = JSON.parse(fs.readFileSync("./data/matches2019.json", "utf-8"));
const channels = JSON.parse(fs.readFileSync("./data/channels.json", "utf-8"));
const tvSchedule = JSON.parse(fs.readFileSync("./data/tv-schedule.json", "utf-8"));

const formatMatches = (unformattedMatches) => unformattedMatches.map((m, idx) => {
  const channelId = tvSchedule[idx].channelId;

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
          channelId
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
const teams = formatTeams(teams2019Json);
const matches = formatMatches(matches2019Json);

module.exports = {
  teams,
  matches,
  channels
}