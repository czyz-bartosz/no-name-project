import User from "../models/User.js";
import League from "../models/League.js";
import Match from "../models/Match.js";
import Player from "../models/Player.js";
import Team from "../models/Team.js";
import TeamLeague from "../models/TeamLeague.js";

League.belongsTo(User, { foreignKey: 'creatorUserId' });
League.hasMany(Match, { foreignKey: 'leagueId' });
League.hasMany(TeamLeague, { foreignKey: 'leaguesId' });
Match.belongsTo(League, { foreignKey: 'leagueId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId' });
Match.belongsTo(User, { foreignKey: 'refereeUserId' });
Player.belongsTo(User, { foreignKey: 'usersId' });
Player.belongsTo(Team, { foreignKey: 'teamsId' });
Team.belongsTo(User, { foreignKey: 'creatorUserId' });
Team.hasMany(Player, { foreignKey: 'teamsId' });
Team.hasMany(TeamLeague, { foreignKey: 'teamsId' });
Team.hasMany(Match, { foreignKey: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'awayTeamId' });
TeamLeague.belongsTo(Team, { foreignKey: 'teamsId' });
TeamLeague.belongsTo(League, { foreignKey: 'leaguesId' });
User.hasMany(League, {foreignKey: 'creatorUserId'});
User.hasMany(Match, { foreignKey: 'refereeUserId' });
User.hasMany(Player, { foreignKey: 'usersId' });
User.hasMany(Team, { foreignKey: 'creatorUserId' });

export default {};