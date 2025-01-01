import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Team from './Team.js';  // Import Team model
import League from './League.js';  // Import League model
import User from './User.js';  // Import User model

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare awayTeamId: number;
  declare leagueId: number;
  declare startDatetime: Date;
  declare refereeUserId: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare isLive: boolean;
  declare isOver: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Home team ID is required' },
        isInt: { msg: 'Home team ID must be an integer' },
      },
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Away team ID is required' },
        isInt: { msg: 'Away team ID must be an integer' },
      },
    },
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leagues',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'League ID is required' },
        isInt: { msg: 'League ID must be an integer' },
      },
    },
    startDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Start datetime is required' },
        isDate: {
          args: true, 
          msg: 'Start datetime must be a valid date'
        },
      },
    },
    refereeUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      validate: {
        isInt: { msg: 'Referee user ID must be an integer' },
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'Home team goals must be an integer' },
        min: { args: [0], msg: 'Home team goals cannot be negative' },
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'Away team goals must be an integer' },
        min: { args: [0], msg: 'Away team goals cannot be negative' },
      },
    },
    isLive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: 'Is live status is required' },
        isIn: {
          args: [[true, false]],
          msg: 'Is live status must be true or false',
        },
      },
    },
    isOver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: 'Is over status is required' },
        isIn: {
          args: [[true, false]],
          msg: 'Is over status must be true or false',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'matches',
    timestamps: false,
  }
);

Match.belongsTo(League, { foreignKey: 'leagueId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId' });
Match.belongsTo(User, { foreignKey: 'refereeUserId' });

export default Match;