import Team from "../interfaces/Team";

const getTeamById = async (id: number) : Promise<Team> => {
    const data = await fetch(`http://localhost:4000/public/teams/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    const team = await data.json();
    
    return team;
};

export default getTeamById;