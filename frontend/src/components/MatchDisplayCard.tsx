import { FC, useEffect, useState } from "react";
import Match from "../interfaces/Match";
import getTeamById from "../services/getTeamById";
import { Card, Row, Col, Placeholder } from "react-bootstrap";
import getImageUrl from "../utils/getImageUrl";
import Logo from "/src/assets/Logo.png";

interface MatchDisplayCardProps {
  match: Match;
  onClick: () => void;
}

const MatchDisplayCard: FC<MatchDisplayCardProps> = (props) => {
  const { match, onClick } = props;
  const [homeTeam, setHomeTeam] = useState<{ name: string; logoUrl: string } | null>(null);
  const [awayTeam, setAwayTeam] = useState<{ name: string; logoUrl: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const homeTeamData = await getTeamById(match.homeTeamId);
        const awayTeamData = await getTeamById(match.awayTeamId);
        
        setHomeTeam({ name: homeTeamData.name, logoUrl: homeTeamData.logoUrl });
        setAwayTeam({ name: awayTeamData.name, logoUrl: awayTeamData.logoUrl });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    
    fetchTeams();
  }, [match.homeTeamId, match.awayTeamId]);

  return (
    <Card style={{ width: "400px" }} onClick={onClick}>
      <Card.Body>
        <Row>
          <Col xs={3} className="d-flex align-items-center justify-content-center">
            {loading ? (
              <Placeholder as="div" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            ) : (
              <img
                alt={`${homeTeam?.name} logo`}
                src={ homeTeam?.logoUrl ? getImageUrl(homeTeam.logoUrl) : Logo }
                style={{ width: "80px", height: "80px" }}
              />
            )}
          </Col>
          <Col xs={6} className="d-flex flex-column align-items-center justify-content-center">
            {loading ? (
              <Placeholder as="div" xs={12} />
            ) : (
              <>
                <Card.Title>
                  {homeTeam?.name}
                  <div>
                    vs
                  </div>
                  {awayTeam?.name}
                </Card.Title>
                <Card.Text>
                  <strong>Wynik:</strong> {`${match.homeTeamGoals} - ${match.awayTeamGoals}`}
                </Card.Text>
                <Card.Text>
                  <strong>Data:</strong> {new Date(match.startDatetime).toISOString().slice(0, 16).replace("T", " ")}
                </Card.Text>
              </>
            )}
          </Col>
          <Col xs={3} className="d-flex align-items-center justify-content-center">
            {loading ? (
              <Placeholder as="div" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            ) : (
              <img
                alt={`${awayTeam?.name} logo`}
                src={ awayTeam?.logoUrl ? getImageUrl(awayTeam.logoUrl) : Logo }
                style={{ width: "80px", height: "80px" }}
              />
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MatchDisplayCard;
