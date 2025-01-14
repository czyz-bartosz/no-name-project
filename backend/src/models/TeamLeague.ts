import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class TeamLeague extends Model {
    declare teamsId: Number;
    declare leaguesId: Number;
}

TeamLeague.init(
  {
    teamsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Team ID is required' },
        isInt: { msg: 'Team ID must be an integer' },
      },
    },
    leaguesId: {
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
  },
  {
    sequelize,
    tableName: 'teams_leagues',
    indexes: [
      {
        unique: true,
        fields: ['teamsId', 'leaguesId'], // Composite unique key
      },
    ],
  }
);

export default TeamLeague;