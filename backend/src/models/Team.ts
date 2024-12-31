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
      validate: {
        notNull: { msg: 'Team name is required' },
        len: {
          args: [1, 255],
          msg: 'Team name must be between 1 and 255 characters',
        },
      },
    },
    creatorUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Creator user ID is required' },
        isInt: { msg: 'Creator user ID must be an integer' },
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