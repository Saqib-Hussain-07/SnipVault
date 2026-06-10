# SnipVault — Code Snippet Manager

A full-stack web app to save, search, tag, and share code snippets. Built with React + Node.js + MongoDB.

![SnipVault](https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20MongoDB-6366f1)

## Features

- **Save snippets** with title, language, tags, and syntax highlighting
- **Search** across title and code content instantly
- **Filter** by language or tag from the sidebar
- **Public share links** — share any snippet with a unique URL (no login needed)
- **JWT Authentication** — register, login, protected routes
- **20+ languages** supported with Prism.js syntax highlighting
- **One-click copy** to clipboard with visual feedback
- **Dark theme** UI

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| Syntax highlight | Prism.js |
| HTTP | Axios (with JWT interceptor) |
| Toasts | react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT + bcryptjs |
| Share IDs | nanoid |

## Project Structure

```
snipvault/
├── .github/          # GitHub issue & pull request templates
├── client/           # React frontend (Vite)
│   └── src/
│       ├── api/          # Axios + API calls
│       ├── assets/       # Media assets
│       ├── components/   # UI components
│       ├── context/      # Auth + Snippet context
│       ├── hooks/        # Custom React hooks (useClipboard)
│       ├── pages/        # Route pages
│       └── utils/        # Utility helpers & language colors
└── server/           # Node + Express backend
    ├── config/       # Database config
    ├── controllers/  # API route controllers
    ├── middleware/   # JWT auth & error handlers
    ├── models/       # Mongoose data schemas
    └── routes/       # API router endpoints
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (Atlas account or local instance)

### 1. Installation

This project is set up as a monorepo using npm workspaces. You can install all dependencies (for both frontend and backend) with a single command from the root directory:

```bash
# Install root, client, and server dependencies
npm install
```

### 2. Environment Variables

Create a `.env` file in the `server` directory. You can copy the example file:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and update the values:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Run the Application

You can start both the backend server and frontend client concurrently with a single command from the root folder:

```bash
# Run both frontend and backend concurrently in development mode
npm run dev
```

The services will run at:
- **Frontend Client**: http://localhost:5173
- **Backend Server**: http://localhost:5000

### Other Available Scripts

- `npm run lint`: Lint the frontend code.
- `npm run build:client`: Build the frontend client for production.
- `npm run start:server`: Start only the backend server.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login, get JWT |
| GET | /api/auth/me | Get current user |

### Snippets (JWT required except share)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/snippets | Get all (supports ?search, ?tag, ?language) |
| POST | /api/snippets | Create snippet |
| GET | /api/snippets/:id | Get one |
| PUT | /api/snippets/:id | Update |
| DELETE | /api/snippets/:id | Delete |
| GET | /api/snippets/share/:shareId | Public view (no auth) |

## Deployment

**Backend → Render.com**
1. Push to GitHub
2. New Web Service on Render
3. Build: `npm install`, Start: `node index.js`
4. Add environment variables in Render dashboard

**Frontend → Vercel**
1. Import client folder to Vercel
2. Set environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
3. Update `axiosInstance.js` baseURL to use `import.meta.env.VITE_API_URL`

## What I Learned Building This

- JWT authentication flow (register → token → protected routes)
- React Context API for global state management
- Custom hooks (`useClipboard`) for reusable logic
- Mongoose models with ownership checks for security
- Prism.js integration with React `useRef` + `useEffect`
- MongoDB `$regex` for search, `$in` for array tag filtering
- `nanoid` for generating unique share IDs

---

Built by [Your Name] · [Live Demo](#) · [LinkedIn](#)
