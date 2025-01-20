import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Match from "../../interfaces/Match";
import { Form, Button, Alert } from "react-bootstrap";

const UpdateMatchPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { match, setMatch, isLoading, error } = useGetMatchQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error fetching match data. Please try again later.
      </Alert>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!match) return;
    fetch(`http://localhost:4000/matches/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(match),
    }).then((response) => {
      if (!response.ok) {
        console.error("Failed to update match");
      } else {
        console.log("Match updated successfully");
        navigate("/RefereePanel");
      }
    });
  };

  return (
    <div className="container p-3">
      <h1>Update Match</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formStartDatetime">
          <Form.Label>Start Datetime</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="Enter start datetime"
            value={
              match?.startDatetime
                ? new Date(match?.startDatetime).toISOString().slice(0, 16)
                : ""
            }
            onChange={(e) => {
              if (match) {
                setMatch({
                  ...match,
                  startDatetime: new Date(e.target.value + "Z").toISOString(),
                });
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHomeTeamGoals">
          <Form.Label>Home Team Goals</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter home team goals"
            value={match?.homeTeamGoals || 0}
            min={0}
            onChange={(e) => {
              if (match) {
                setMatch({
                  ...match,
                  homeTeamGoals: parseInt(e.target.value, 10),
                });
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAwayTeamGoals">
          <Form.Label>Away Team Goals</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter away team goals"
            value={match?.awayTeamGoals || 0}
            min={0}
            onChange={(e) => {
              if (match) {
                setMatch({
                  ...match,
                  awayTeamGoals: parseInt(e.target.value, 10),
                });
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIsLive">
          <Form.Check
            type="checkbox"
            label="Is Live"
            checked={match?.isLive || false}
            onChange={(e) => {
              if (match) {
                setMatch({ ...match, isLive: e.target.checked });
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIsOver">
          <Form.Check
            type="checkbox"
            label="Is Over"
            checked={match?.isOver || false}
            onChange={(e) => {
              if (match) {
                setMatch({ ...match, isOver: e.target.checked });
              }
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMatchPage;

function useGetMatchQuery(id: string | undefined): {
  match: Match | null;
  isLoading: boolean;
  error: string | null;
  setMatch: (match: Match) => void;
} {
  const [match, setMatch] = useState<Match | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/public/matches/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch match data");
        }
        const result = await response.json();
        setMatch(result);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error fetching match data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  return { match, setMatch, isLoading, error };
}
