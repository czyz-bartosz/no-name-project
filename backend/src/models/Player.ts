import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';  // Adjust this import based on your project structure

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
      validate: {
        notNull: { msg: 'User ID is required' },
        isInt: { msg: 'User ID must be an integer' },
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
      validate: {
        notNull: { msg: 'Team ID is required' },
        isInt: { msg: 'Team ID must be an integer' },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: { msg: 'Active status is required' },
        isIn: {
          args: [[true, false]],
          msg: 'Active status must be true or false',
        },
      },
    },
  },
  {
    sequelize,
    tableName: 'players',
  }
);


export default Player;