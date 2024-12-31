import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';  // Import User model
import Player from './Player.js';
import TeamsLeagues from './TeamLeague.js';
import Match from './Match.js';

class Team extends Model {
  declare id: number;
  declare name: string;
  declare creatorUserId: number;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'teams',
  }
);

Team.belongsTo(User, { foreignKey: 'creatorUserId' });
// Team.hasMany(Player, { foreignKey: 'teamsId' });
// Team.hasMany(TeamsLeagues, { foreignKey: 'teamsId' });
// Team.hasMany(Match, { foreignKey: 'homeTeamId' });
// Team.hasMany(Match, { foreignKey: 'awayTeamId' });

export default Team;