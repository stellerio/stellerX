# StellerXlets

A clean game launcher built around a slide-out library and a dynamic embedded player.

## Features

- Animated left-side library
- Search and categories
- Dynamic game selection
- Embedded player
- Reload, fullscreen, minimize, and open-in-new-tab controls
- Responsive mobile sidebar
- Express API backend
- Game library stored in data/games.json
- No AI commentary UI

## Structure

stellerX/
- frontend/components/
- frontend/pages/
- frontend/styles/
- frontend/animations/
- frontend/src/
- backend/routes/
- backend/services/
- data/games.json

## Local development

`npm install`

`npm run dev`

Frontend: http://localhost:5173
API: http://localhost:3001

## API

GET /api/health
GET /api/games
GET /api/games/:id
POST /api/games
PUT /api/games/:id
DELETE /api/games/:id

Some sites prevent iframe embedding with their own browser security headers. This project does not attempt to bypass those restrictions.
