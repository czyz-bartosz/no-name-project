import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Team extends Model {
  declare id: number;
  declare name: string;
  declare creatorUserId: number;
  declare logoUrl: string;
  declare isDeleted: boolean;
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
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'teams',
  }
);

export default Team;