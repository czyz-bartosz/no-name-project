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
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leagues',
        key: 'id',
      },
    },
    startDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refereeUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isLive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isOver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    sequelize,
    modelName: 'Match',
    tableName: 'matches',
    timestamps: false,
  }
);

Match.belongsTo(League, { foreignKey: 'leagueId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId' });
Match.belongsTo(User, { foreignKey: 'refereeUserId' });

export default Match;