# 🚀 SpeakSpace

SpeakSpace is a collaborative platform designed to enhance group discussion and interview skills. It offers real-time video conferencing, structured feedback, and AI-powered analytics to help participants improve their communication, clarity, and teamwork.

## 🌟 Features

### 🎥 Frontend

- Real-Time Video Conferencing — Powered by Jitsi Meet SDK.
- Role-Based Dashboard
    - 👤 Participants: Join sessions to practice and improve skills.
    - 🧑‍💼 Moderators: Manage sessions and monitor progress.
    - 📝 Evaluators: Provide feedback and insights.
- Feedback System — Submit and view ratings on communication, clarity, and collaboration.
- Analytics Dashboard — Track personal and group progress with trend graphs.
- AI Assistant — Real-time analysis of sentiment, engagement, and areas of improvement.
- Responsive UI — Optimized for both desktop and mobile screens.

### 🧠 Backend

- Session Management — Create, join, and manage sessions using unique codes.
- Feedback Storage — Save and retrieve user feedback.
- AI Integration — Use Google Generative AI to analyze conversations.
- Secure Access Control — Role-based login and API access.

## 🛠 Tech Stack

### 🖥 Frontend

- React — User interface
- Tailwind CSS — Styling and responsiveness
- Jitsi Meet SDK — Video conferencing
- Axios — HTTP requests
- React Router — Navigation and routing

### 🖧 Backend

- Node.js — Server-side runtime
- Express.js — API framework
- MongoDB — NoSQL database
- Socket.IO — Real-time communication
- Google Generative AI — Conversation analysis

## ⚙️ Installation Guide

### ✅ Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Vite (optional if using globally)

### 🧩 Backend Setup

1. Navigate to the backend directory:
```bash
cd speakspace-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root of speakspace-backend/ and add:
```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

### 🎨 Frontend Setup

1. Navigate to the frontend directory:
```bash
cd speakspace-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend server:
```bash
npm run dev
```

## 🗂 Project Structure

### 📁 speakspace-frontend/
```
├── src/
│   ├── components/       # Reusable components (e.g., Hero, FeedbackForm, AIAssistant)
│   ├── pages/           # Routes (e.g., Dashboard, LiveSession, Analytics)
│   ├── graphs/          # Chart components
│   ├── contexts/        # Context APIs (e.g., AuthContext)
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   ├── index.css       # Global CSS
│   └── App.css         # Additional styles
├── public/             # Static assets
├── vite.config.js      # Vite build config
└── tailwind.config.js  # Tailwind config
```

### 📁 speakspace-backend/
```
├── models/             # Mongoose models (User.js, Session.js, Feedback.js)
├── controllers/        # Logic (feedbackController.js, aiController.js)
├── routes/            # API endpoints (feedbackRoutes.js, aiRoutes.js)
├── server.js          # Backend entry point
├── .env               # Environment variables
└── package.json       # Dependencies & scripts
```

## 📡 API Endpoints

### 🔁 Feedback

- POST /api/feedback/submit — Submit feedback.
- GET /api/feedback/user/:userId — Get user-specific feedback.

### 🤖 AI Analysis

- POST /api/ai/analyze — Analyze conversation for tone and clarity.

### 🧑‍🤝‍ Session

- GET /api/sessions/public — Fetch publicly available sessions.

## 🔑 Key Components Overview

### 📱 Frontend

- Hero.jsx — Landing page banner
- Dashboard.jsx — User-specific dashboard
- LiveSession.jsx — Real-time session with Jitsi integration
- Analytics.jsx — Feedback graphs and progress tracking

### 🔧 Backend

- User.js — Schema for user authentication and roles
- Session.js — Schema for session management
- Feedback.js — Schema for storing evaluations
- aiController.js — Handles AI-driven conversation insights

## 📄 License

This project is licensed under the MIT License.

## 🧑‍💻 Made with ❤️ by Diet Coders
