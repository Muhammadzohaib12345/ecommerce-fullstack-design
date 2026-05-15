# ecommerce-fullstack-design

Fullstack eCommerce web app built with React (Vite + Tailwind) frontend and Node.js + Express + MongoDB backend.

## Quick start

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (in another terminal)
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Seed the database

```bash
cd server
node seed/seedProducts.js
```

## Environment variables

Create `server/.env`:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

For the frontend you can optionally create `client/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

## Tech

- Frontend: React + Vite + TailwindCSS + React Router + Axios
- Backend: Node.js + Express + Mongoose + JWT + bcryptjs
- Auth: JWT
- State: React Context + localStorage
