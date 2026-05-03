# 🔴 Ashritha Kudumula — Full Stack Portfolio

A production-ready full-stack portfolio web application built with **React, Node.js, Express, and MongoDB Atlas**, featuring a modern animated UI and a secure admin dashboard to manage content dynamically.

---

## ✨ Features

- 🔐 JWT-based authentication (Admin login)
- 🛠 Admin dashboard (manage projects & messages)
- 📂 Dynamic project management (CRUD)
- 📬 Contact form with email notifications
- 🍃 MongoDB Atlas database integration
- ⚡ REST API architecture
- 🎨 Neon red UI with glassmorphism & animations
- 📱 Fully responsive design
- 🛡️ Security: bcrypt, Helmet, CORS, rate limiting

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcrypt |
| Email | Nodemailer |
| Deployment | Render |

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   └── index.html              ← SEO meta tags, JSON-LD structured data
├── src/
│   ├── App.js                  ← Router, loader, effects
│   ├── index.js                ← Entry point
│   ├── api/
│   │   └── services.js         ← REST API calls to Node.js backend
│   ├── components/
│   │   ├── Navbar.js           ← Responsive sticky nav with dark/light toggle
│   │   ├── Footer.js           ← Social links footer
│   │   ├── ParticleBackground.js ← Canvas-based particle network
│   │   └── Effects.js          ← Custom cursor + scroll progress bar
│   ├── context/
│   │   └── ThemeContext.js     ← Dark / Light mode (persisted in localStorage)
│   ├── pages/
│   │   ├── Home.js             ← Hero, typing animation, tech preview, CTA
│   │   ├── About.js            ← Bio, skill flashcards, interests, goals
│   │   ├── SkillsJourney.js    ← Proficiency bars, tech stack, project timeline
│   │   ├── Projects.js         ← Filterable project grid (MongoDB + fallback)
│   │   ├── Contact.js          ← Contact form → saves to MongoDB + email notification
│   │   └── Admin.js            ← 🔐 Protected dashboard (JWT auth)
│   └── styles/
│       └── global.css          ← Full design system, neon red, glassmorphism
└── server/
    ├── index.js                ← Express server — MongoDB, REST API, JWT auth, email
    ├── package.json            ← Server dependencies
    └── .env.example            ← Environment variable template
```

---

## 🚀 Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Add a `.env` file in the root with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your values:
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT secret — any long random string
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random

# Secret used once to register your admin account
ADMIN_SECRET=your_admin_registration_secret

# Gmail credentials for email notifications
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-gmail-app-password
OWNER_EMAIL=your-gmail@gmail.com
```

Start the server:
```bash
npm run dev     # Development with nodemon
npm start       # Production
```

---

### 3. MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign in
2. Create a free **M0** cluster
3. Click **Connect → Connect your application**
4. Copy the connection string and paste into `MONGODB_URI` in `server/.env`
5. Replace `<username>` and `<password>` with your Atlas credentials
6. Go to **Network Access → Add IP Address → Allow Access from Anywhere** (for deployment)

---

### 4. Create Your Admin Account

Run this **once** after starting the server to create your admin login:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "your_email",
  "password": "your_password",
  "secret": "your_admin_secret"
}'
```

---

### 5. Gmail App Password (for email notifications)

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Create a new App Password for **Mail**
3. Copy the 16-character password into `EMAIL_PASS` in `server/.env`

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home — hero, typing animation, tech preview, CTA |
| `/about` | Bio, skill flashcards, interests, goals |
| `/skills` | Proficiency bars, tech stack, project + cert timeline |
| `/projects` | Filterable project grid (MongoDB data + fallback) |
| `/contact` | Contact form → saves to MongoDB + email notification |
| `/admin` | 🔐 Protected dashboard — manage messages & projects |

---

## 🍃 MongoDB Collections

| Collection | Description |
|---|---|
| `messages` | Contact form submissions |
| `projects` | Portfolio projects (managed via admin) |
| `projectupdates` | Changelog entries per project |
| `admins` | Admin accounts (hashed passwords) |

---

## 🌐 REST API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/:id` | Get single project |
| `GET` | `/api/projects/:id/updates` | Get project updates |

### Admin (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create admin (one-time) |
| `POST` | `/api/auth/login` | Login → get JWT token |
| `GET` | `/api/messages` | Get all messages |
| `PATCH` | `/api/messages/:id/read` | Mark message as read |
| `DELETE` | `/api/messages/:id` | Delete message |
| `POST` | `/api/projects` | Add new project |
| `PUT` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |
| `POST` | `/api/projects/:id/updates` | Add project update |

---

## 🚢 Deployment

### 🌐 Frontend + Backend — Render

This project is fully deployed using **Render**.

### 🔹 Backend Deployment (Render)

1. Go to https://render.com
2. Create a **Web Service**
3. Connect your GitHub repository
4. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. Add Environment Variables.


6. Click **Deploy**

---

### 🔹 Frontend Deployment (Render)

1. Create a **Static Site** on Render
2. Connect the same GitHub repo
3. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

4. Add environment variable.
---

### Frontend (`/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (`/server/.env`)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
ADMIN_SECRET=...
EMAIL_USER=...
EMAIL_PASS=...
OWNER_EMAIL=...
```

---

### ⚠️ Important Notes

- MongoDB Atlas must allow external connections (Network Access → Allow All)
- Backend may take ~30 seconds to wake up (Render free tier)
- Always use HTTPS URLs in production

---

Built with ❤️ by Ashritha Kudumula
