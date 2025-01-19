# No name project

## How to run
1. install nodejs

### backend
1. Change directory to backend
2. run `npm i`
3. copy .env.example file as .env, and ucomment lines with jwt secrets and add secrets
4. run `npm run watch`


### frontend
1. Change directory to frontend
2. run `npm i`
4. run `npm run dev`

## Components
- **backend:** nodejs, express, sequalize, jwt
- **frontend:** react, bootstrap

## Team:
- Paweł Gałczyński
- Bartosz Czyż

## Description:
Event Creator:
- Create League: Initiates the formation of a new league.
- Add Teams: Integrates teams into the league.
  
Team Manager:
- Create Team: Responsible for forming and managing a team within the league.

Referee:
- Manage Match Protocols: Has the ability to add and edit match protocols to ensure fair play.
- View Assigned Matches: Can see the matches they are scheduled to officiate.
  
Guest:
- View Leagues: Has access to view the list of leagues.
- View Live Scores: Can see live scores of ongoing matches.
- Create Account: Has the option to create an account for enhanced access.
