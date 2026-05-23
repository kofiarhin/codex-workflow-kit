# KareBraids MERN Boilerplate

This scaffold adds a KareBraids React/Vite frontend and Express/Mongo backend to the workspace.

## Setup

```bash
npm install
cp .env.example .env
cp client/.env.example client/.env
npm run dev
```

The default development URLs are:

- Frontend: `http://127.0.0.1:5175`
- Backend: `http://localhost:5000/api`

`MONGODB_URI` may be left blank for local smoke testing. When it is provided, the
server connects to MongoDB at startup.

## Commands

```bash
npm run dev
npm run build
npm run test
npm run test:client
npm run test:server
```

## Structure

```txt
client/
  src/
    components/
    hooks/
      queries/
      mutations/
    lib/
      api.js
    pages/
    redux/
    routes/
    services/
    styles/
  test/

server/
  config/
  controllers/
  middleware/
  models/
  routes/
  tests/
  utils/
```

Frontend API calls go through `client/src/lib/api.js` and service modules.
Backend environment validation lives in `server/config/env.js`.
