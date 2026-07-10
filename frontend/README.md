# zoom — Frontend

React frontend for the Connect Your Learning video collaboration app.
Built with Create React App, Material UI, React Router, Axios and Socket.IO client.

## Getting Started

From this directory:

```bash
npm install
npm start
```

The dev server runs at http://localhost:3000.

By default the app talks to the production backend. To point it at a local
backend, set an environment variable before starting:

```bash
REACT_APP_SERVER_URL=http://localhost:8000 npm start
```

## Scripts

- `npm start` — start the development server.
- `npm run build` — create a production build in `build/`.
- `npm test` — run the test suite.

## Main Screens

| Route | Screen |
| --- | --- |
| `/` | Landing page with branded app positioning. |
| `/auth` | Sign in / sign up. |
| `/home` | Dashboard for joining meetings (requires login). |
| `/history` | Previous meeting codes and dates. |
| `/resume` | Personal profile, skills, projects, and PDF preview. |
| `/:code` | Video meeting room (guest access allowed). |

## Project Structure

```
src/
  contexts/   AuthContext — login, register, meeting history API calls
  pages/      Landing, Authentication, Home, History, Resume, VideoMeet
  styles/     CSS modules for the meeting UI
  utils/      withAuth route-guard HOC
```
