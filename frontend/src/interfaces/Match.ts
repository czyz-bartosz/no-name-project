export default interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  startDatetime: string;
  refereeUserId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  isLive: boolean;
  isOver: boolean;
};