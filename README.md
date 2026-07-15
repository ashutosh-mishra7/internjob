# InternJob.in 🚀

[![Live Website](https://img.shields.io/badge/Live-internjob7.vercel.app-blueviolet?style=for-the-badge&logo=vercel)](https://internjob7.vercel.app/)
[![API Status](https://img.shields.io/badge/API-internjob.onrender.com-success?style=for-the-badge&logo=render)](https://internjob.onrender.com/)

**InternJob.in** is a premium, modern, and state-of-the-art job and internship portal designed to bridge the gap between ambitious job seekers and verified organizations. The platform features responsive clean aesthetics, interactive micro-animations, a multi-role user system, and real-time dashboard controls.

---

## 🌟 Key Features

### 👤 For Candidates (Users)
- **Interactive Dashboards:** Track applied internships, save roles for later, and view personalized recommendations.
- **Smart Listings Search:** Multi-parameter filters (Job Type, Location, Experience Level, Work Mode) with real-time query updates.
- **Resume Builder:** An intuitive, user-friendly builder to compile and format professional details.
- **Dynamic Application:** Apply instantly with a single click or redirect to external applications.

### 🏢 For Organizations (Employers)
- **Vetted Profiles:** Secure workspace to post new listings, edit active roles, and delete positions.
- **Verification Badge:** A verification checkmark provided after admin vetting to assure credibility and authenticity.
- **Applicant Tracking:** View and manage candidates applying to roles from the dashboard.

### 🔑 For Admins
- **Global Vetting:** Approve, verify, or block organizations.
- **User/Admin Management:** Create new admins, reset passwords, or delete entries.
- **Unified Controls:** Clean control panel to monitor all activity across the platform.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS & Vanilla CSS (Plus Jakarta Sans typography)
- **Animations:** Framer Motion (smooth fade-ins, stagger effects, and hover interactions)
- **Routing:** React Router DOM (Single Page Application routing with `vercel.json` rewrites)
- **HTTP Client:** Axios (interceptors with credentials)

### Backend
- **Environment:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) with Secure Cookie-based Sessions (`cookie-parser`)
- **CORS Management:** Dynamic CORS configuration supporting local testing and production Vercel clients.

---

## 📂 Project Structure

```
internjob/
├── client/                 # React Frontend (Vite)
│   ├── public/             # Static assets (Favicons, OG Image)
│   ├── src/                # Component & Page logic
│   │   ├── components/     # Reusable layout sections (Navbar, Footer, Dashboards)
│   │   ├── context/        # Global Auth & Theme Context Providers
│   │   ├── pages/          # View Router components (Home, Register, Listings, etc.)
│   │   └── utils/          # Static helpers & assets
│   ├── vercel.json         # SPA routing rewrites for Vercel
│   └── package.json
│
├── server/                 # Node.js Express Backend
│   ├── config/             # DB and client setups
│   ├── controllers/        # Request handlers (auth, users, listings, admin)
│   ├── middlewares/        # Authentication & Role validation
│   ├── models/             # Mongoose schemas (User, Organization, Listing, Admin)
│   ├── routes/             # API Router endpoints
│   ├── utils/              # Token generation & utility functions
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables Setup

### 1. Server Configuration (`server/.env`)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/internjob
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://internjob7.vercel.app
```

### 2. Client Configuration
Specify the target API server URL in your Vercel/Vite build process:
- **Variable Key:** `VITE_API_URL`
- **Value:** `https://internjob.onrender.com`

---

## 🚀 Local Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/ashutosh-mishra7/internjob.git
cd internjob
```

### Step 2: Setup Server
```bash
cd server
npm install
npm start
```
*The server will be running on `http://localhost:5000`.*

### Step 3: Setup Client
```bash
cd ../client
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`.*

---

## 🌍 Production Deployment

### Backend (Render Web Service)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** Must set `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL` (pointing to your Vercel domain).

### Frontend (Vercel)
- **Root Directory:** `client`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** Set `VITE_API_URL` to your Render API backend.
