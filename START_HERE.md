# EMERGENCY BUILD — Run This Now in Claude Code

## Paste this EXACT prompt into Claude Code:

---

Read CLAUDE.md. I need you to build this entire eCommerce fullstack project RIGHT NOW in one session. Today is the deadline.

Do everything in this order without stopping:

1. Create the full folder structure (client + server)
2. Install all dependencies for both frontend and backend
3. Build the complete backend (server.js, db.js, models, routes, middleware, seed file)
4. Build the complete frontend (all pages, components, contexts, utils)
5. Make sure both run together with `npm run dev`
6. Seed the database

Do NOT ask me questions. Do NOT stop between steps. Just build everything.

Start now.

---

## If Claude Code asks for MongoDB URI, use MongoDB Atlas:
1. Go to mongodb.com/atlas → Free account
2. Create cluster → Get connection string
3. Paste into server/.env as MONGO_URI=...

## After Claude Code finishes, run:
```
cd server && npm run dev        # Terminal 1
cd client && npm run dev        # Terminal 2
```

Then open: http://localhost:5173
