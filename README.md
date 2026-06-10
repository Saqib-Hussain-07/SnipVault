# SnipVault

A full-stack personal code snippet manager — save, search, tag, and share your code snippets with syntax highlighting and a one-click public share link.

![Status](https://img.shields.io/badge/Status-Work%20In%20Progress-orange)
![Version](https://img.shields.io/badge/Version-0.1.0%20prototype-blue)

> 🚧 **This project is a prototype and is actively being developed.**
> Some features may not work as expected. Contributions and feedback are welcome!


**Live Demo:** [snipvault.vercel.app](https://snipvault.vercel.app) &nbsp;·&nbsp; **Backend API:** [snipvault-api.onrender.com](https://snipvault-api.onrender.com)

![SnipVault Dashboard Preview](https://placehold.co/1200x600/1a1a2e/ffffff?text=SnipVault+Dashboard+Preview)

---

## The problem it solves

Developers copy-paste the same code across projects and lose track of useful patterns — useful regex, auth boilerplate, API helpers. There's no simple, free tool to store and search personal code snippets with proper syntax highlighting. SnipVault fixes that.

---

## Features

- **Save snippets** with title, language, and comma-separated tags
- **Syntax highlighting** via Prism.js for 15+ languages
- **Full-text search** across snippet titles and code
- **Filter by tag or language** from the sidebar
- **One-click copy** to clipboard with visual confirmation
- **Public share link** — toggle a snippet public and share it via a unique URL (no login required for viewers)
- **JWT authentication** — register, login, protected routes
- **Per-user data** — every snippet is private by default, only visible to its owner

---

## Tech stack

**Frontend**
- React 18 (Vite)
- React Router v6
- Tailwind CSS
- Axios (with JWT interceptor)
- Prism.js (syntax highlighting)
- React Hot Toast

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs (password hashing)
- nanoid (share link generation)
- CORS + dotenv

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Project structure

```
snipvault/
├── client/                     # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── layout/         # Navbar, Sidebar, ProtectedRoute
│       │   ├── snippets/       # SnippetCard, SnippetList, SnippetForm, CodeBlock, TagBadge
│       │   ├── search/         # SearchBar, FilterPanel
│       │   └── ui/             # Button, Modal, Toast, CopyButton
│       ├── pages/              # LoginPage, RegisterPage, DashboardPage, SnippetDetailPage, PublicSnippetPage
│       ├── context/            # AuthContext, SnippetContext
│       ├── hooks/              # useAuth, useSnippets, useClipboard
│       ├── api/                # axiosInstance, authApi, snippetApi
│       └── utils/              # languageColors
│
└── server/                     # Node.js + Express backend
    ├── controllers/            # authController, snippetController
    ├── models/                 # User, Snippet (Mongoose schemas)
    ├── routes/                 # authRoutes, snippetRoutes
    ├── middleware/             # authMiddleware (JWT), errorHandler
    └── config/                 # db.js (MongoDB connection)
```

---

## Getting started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/snipvault.git
cd snipvault
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API reference

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user, returns JWT | No |
| POST | `/api/auth/login` | Login with email + password, returns JWT | No |
| GET | `/api/auth/me` | Get current user from JWT | Yes |

### Snippets — `/api/snippets`

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/api/snippets` | Get all snippets for logged-in user. Supports `?search=`, `?tag=`, `?language=` | Yes |
| POST | `/api/snippets` | Create a new snippet | Yes |
| GET | `/api/snippets/:id` | Get a single snippet by ID (owner only) | Yes |
| PUT | `/api/snippets/:id` | Update a snippet (owner only) | Yes |
| DELETE | `/api/snippets/:id` | Delete a snippet (owner only) | Yes |
| GET | `/api/snippets/share/:shareId` | Get a public snippet by share ID | No |

### Example request — create a snippet

```bash
curl -X POST http://localhost:5000/api/snippets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Debounce function",
    "code": "const debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};",
    "language": "javascript",
    "tags": ["utils", "performance"],
    "isPublic": false
  }'
```

---

## Database schema

### User

| Field | Type | Notes |
|-------|------|-------|
| name | String | required |
| email | String | required, unique |
| password | String | bcrypt hashed before save |
| createdAt | Date | auto (timestamps) |

### Snippet

| Field | Type | Notes |
|-------|------|-------|
| title | String | required, max 100 chars |
| code | String | required |
| language | String | required (javascript, python, java, etc.) |
| tags | [String] | array, default [] |
| isPublic | Boolean | default false |
| shareId | String | unique, nanoid — generated when isPublic is true |
| owner | ObjectId | ref: User — for ownership enforcement |
| createdAt / updatedAt | Date | auto (timestamps) |

---

## Key implementation notes

**Ownership enforcement** — every snippet route queries with both `_id` and `owner` to prevent users accessing each other's data even if they know the snippet ID:
```js
Snippet.findOne({ _id: req.params.id, owner: req.user.id })
```

**JWT interceptor** — `axiosInstance.js` attaches the token to every request automatically so individual API calls don't need to handle headers:
```js
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**Search query** — MongoDB `$regex` + `$in` for simultaneous text search and tag filtering:
```js
{ title: { $regex: search, $options: 'i' }, tags: { $in: [tag] } }
```

---

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Set root directory to `server/`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`

### Frontend (Vercel)

1. Import the GitHub repo on [vercel.com](https://vercel.com)
2. Set root directory to `client/`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy — Vercel auto-detects Vite

---

## What I learned building this

- Structuring a React project with Context + custom hooks for clean state management
- Implementing JWT auth end-to-end — from bcrypt hashing on the backend to protected routes on the frontend
- Using Prism.js with React refs and `useEffect` for dynamic syntax highlighting
- MongoDB query patterns for search (`$regex`) and tag filtering (`$in`)
- Generating and serving public share links without exposing private data
- Deploying a full-stack app with separate frontend/backend services

---

## Planned improvements

- [ ] Drag-to-reorder snippets
- [ ] Snippet collections / folders
- [ ] Dark mode toggle
- [ ] Import snippets from GitHub Gist
- [ ] VS Code extension to save snippets directly

---

## License

MIT License — feel free to fork, extend, and use in your own projects.

---

## Author

**Your Name**
- GitHub: [Saqib Hussain]([https://github.com/yourusername](https://github.com/Saqib-Hussain-07))
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

> Built as part of a full-stack development portfolio project. MCA 2nd year, 2024–25.
