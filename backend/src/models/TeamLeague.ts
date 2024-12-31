import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Team from './Team.js';  // Import Team model
import League from './League.js';  // Import League model

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
    },
    leaguesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leagues',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'teams_leagues',
  }
);

TeamLeague.belongsTo(Team, { foreignKey: 'teamsId' });
TeamLeague.belongsTo(League, { foreignKey: 'leaguesId' });

export default TeamLeague;