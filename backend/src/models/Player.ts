import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';  // Adjust this import based on your project structure
import User from './User.js';  // Import User model
import Team from './Team.js';  // Import Team model

class Player extends Model {
  declare usersId: number;
  declare teamsId: number;
  declare isActive: boolean;
}

Player.init(
  {
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    teamsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    sequelize,
    tableName: 'players',
  }
);

Player.belongsTo(User, { foreignKey: 'usersId' });
Player.belongsTo(Team, { foreignKey: 'teamsId' });

export default Player;