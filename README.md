# Connect Your Learning

A full stack video meeting app with authentication, real-time video calls,
in-meeting chat, screen sharing, meeting history, and a personal resume
profile.

## Tech Stack

- **Frontend:** React (Create React App), Material UI, React Router, Axios, Socket.IO client, WebRTC
- **Backend:** Node.js, Express, Socket.IO, MongoDB with Mongoose, bcrypt

## Repository Layout

```
frontend/   React app (see frontend/README.md)
backend/    Express API + Socket.IO signalling server
```

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

The server listens on port 8000 by default. Set `PORT` and `MONGO_URI`
environment variables to override the defaults.

### Frontend

```bash
cd frontend
npm install
REACT_APP_SERVER_URL=http://localhost:8000 npm start
```

## Features

- Register / login with hashed passwords (bcrypt)
- Join meetings as a logged-in user or as a guest
- Multi-participant WebRTC video with mute / camera toggle
- Screen sharing and in-meeting group chat
- Meeting history per user
- Resume builder with local persistence and PDF preview
