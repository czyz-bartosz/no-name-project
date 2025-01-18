import { FC } from "react";
import { useEffect, useState } from "react";
import Match from "../interfaces/Match";
import MatchDisplayCard from "./MatchDisplayCard";
import { Stack } from "react-bootstrap";

const Matches : FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('http://localhost:4000/public/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMatches(data);
    };

    fetchMatches();
  }, []);

  return (
    <>
    <Stack gap={3} className="d-flex flex-column container-fluid justify-content-center align-items-center">
      {matches.map( (match, index) => {
        return (
          <MatchDisplayCard key={index} match={match} onClick={()=>{
          }} />
        );
      })}
    </Stack>
    </>
  );
}

export default Matches;