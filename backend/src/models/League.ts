import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Match from './Match.js';
import TeamsLeagues from './TeamLeague.js';

class League extends Model {
  declare id: number;
  declare name: string;
  declare creatorUserId: number;
}

League.init(
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
        len: {
          args: [1, 255],
          msg: "Name must be up to 255 characters long"
        },
        notNull: {
          msg: "Name is required"
        }
      }
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
    tableName: 'leagues'
  }
);

League.belongsTo(User, { foreignKey: 'creatorUserId' });
// League.hasMany(Match, { foreignKey: 'leagueId' });
// League.hasMany(TeamsLeagues, { foreignKey: 'leaguesId' });

export default League;