import { FC, useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import Match from '../../interfaces/Match';
import MatchDisplayCard from '../MatchDisplayCard';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RefereePage : FC = () => {
  const {isLoggedIn} = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate()

  useEffect( () => {
    const fetchMatches = async () : Promise<Match[]> => {
      const data = await fetch('http://localhost:4000/referee/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const matches = await data.json();

      return matches;
    };

    fetchMatches().then( matches => {
      setMatches(matches);
    });
  }, []); 

  return (
    <>
    <Stack gap={3} className="d-flex flex-column container-fluid justify-content-center align-items-center">
      {matches.map( (match, index) => {
        return (
          <MatchDisplayCard key={index} match={match} onClick={()=>{
            navigate(`/RefereePanel/UpdateMatch/${match.id}`);
          }} />
        );
      })}
    </Stack>
    </>
  );
}

export default RefereePage;