# 🔴 Ashritha Kudumula — Portfolio

A professional, multi-page portfolio website with neon red theme, glassmorphism UI,
particle animations, MongoDB + Node.js backend, and a full admin dashboard.

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

## ✨ Features

- 🔴 **Neon red theme** — full spectrum from dark crimson to soft pink
- 🌑 **Dark / Light mode** — persisted in localStorage
- 🕸️ **Particle background** — canvas-based connected dot network
- 🖱️ **Custom cursor** — dot + follower ring effect
- 🃏 **Glassmorphism cards** — backdrop blur + neon border effects
- 📊 **Animated skill bars** — IntersectionObserver triggered
- 🏷️ **Skill flashcards** — hover glow effects
- 🗺️ **Interactive timeline** — alternating left/right, filterable
- 📱 **Fully responsive** — mobile nav, fluid layouts
- 🔍 **SEO optimized** — react-helmet-async, JSON-LD structured data
- 🎬 **Page loader** — animated red fill bar
- 📜 **Scroll progress bar** — neon red top indicator
- 🔐 **Admin dashboard** — JWT protected, message inbox + project CRUD
- 🍃 **MongoDB Atlas** — stores contact messages, projects, project updates
- 📧 **Email notifications** — owner alert + auto-reply on contact form
- ⚡ **Rate limiting** — contact form: 5/hour, API: 100/15min
- 🛡️ **Security** — Helmet.js, CORS, bcryptjs password hashing, JWT tokens

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
    "email": "ashrithakudumula@gmail.com",
    "password": "your_secure_password",
    "secret": "your_admin_registration_secret"
  }'
```

You should get:
```json
{ "success": true }
```

Now log in at: `http://localhost:3000/admin`

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

## 🔐 Admin Dashboard

Access at `/admin` — **not linked in the navbar**, only you know it exists.

### Features:
- **Messages tab** — read/unread inbox, mark read, delete, reply via email
- **Projects tab** — add, edit, delete projects (reflected live on `/projects`)

### Auth Flow:
1. POST `/api/auth/login` with email + password
2. Server returns a **JWT token** (valid 7 days)
3. Token stored in `localStorage`
4. All admin API calls include `Authorization: Bearer <token>`

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

## 🎨 Customization

### Update Personal Info
Replace placeholder content in these files:
- `src/pages/Home.js` — name, title, description
- `src/pages/About.js` — bio, skills, interests, goals
- `src/pages/SkillsJourney.js` — skills, proficiency, timeline
- `src/pages/Contact.js` — email, phone, location, social links
- `src/components/Footer.js` — social links, name
- `src/components/Navbar.js` — logo initials

### Color Theme
All red shades are CSS variables in `src/styles/global.css`:
```css
--neon-primary: #ff2222;
--neon-secondary: #ff6666;
--neon-accent: #ff0044;
```

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, React Router v6 |
| Styling | CSS3, Glassmorphism, Custom animations |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Email | Nodemailer + Gmail |
| SEO | react-helmet-async |
| Deployment | Render (Frontend + Backend) |

---

## ⚠️ Environment Variables Summary

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
