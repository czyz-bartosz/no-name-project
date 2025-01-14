import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Match from './Match.js';
import TeamsLeagues from './TeamLeague.js';
import Team from './Team.js';

interface ILeagueTableRow {
  teamId: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

class League extends Model {
  declare id: number;
  declare name: string;
  declare creatorUserId: number;

  async getTable() {
    const matches = await Match.findAll({
      where: {
        leagueId: this.id,
        isOver: true,
      },
    });

    const teamsIds = (await TeamsLeagues.findAll({
      where: {
        leaguesId: this.id,
      },
      attributes: ['teamsId'],
    })).flatMap((ele) => ele.teamsId) as Number[];

    const table = (await Promise.all( teamsIds.map(async (teamId) => {
      const teamMatches = matches.filter((match) => {
        return match.homeTeamId === teamId || match.awayTeamId === teamId;
      });

      const wins = teamMatches.filter((match) => {
        return match.getWinnerTeamId() === teamId;
      });

      const draws = teamMatches.filter((match) => {
        return match.getWinnerTeamId() === null;
      });

      const losses = teamMatches.filter((match) => {
        return match.getWinnerTeamId() !== null && match.getWinnerTeamId() !== teamId;
      });

      const team = await Team.findOne({
        where: {
          id: teamId
        }
      });

      const teamName = team?.name;

      return {
        teamId: teamId,
        teamName: teamName,
        wins: wins.length,
        draws: draws.length,
        losses: losses.length,
        points: wins.length * 3 + draws.length,
      };
    }))) as ILeagueTableRow[];

    table.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      } else if (a.points < b.points) {
        return 1;
      } else {
        return 0;
      }
    });

    return table;
  }
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

export default League;