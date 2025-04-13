# 🎤 SpeakSpace - Real-Time Communication Platform

![SpeakSpace Logo](public/logo.png)

## 📝 Overview

SpeakSpace is a modern, real-time communication platform that enables seamless video conferencing, chat, and collaboration. Built with cutting-edge technologies, it provides a robust solution for virtual meetings, presentations, and interactive sessions.

## ✨ Features

- 🎥 **Real-time Video Conferencing**
  - High-quality video and audio streaming
  - Screen sharing capabilities
  - Multiple participant support
  - Room-based video sessions

- 💬 **Interactive Chat**
  - Real-time messaging
  - System notifications
  - User presence indicators
  - Message history

- 👥 **User Management**
  - Role-based access control (Host/Participant)
  - User authentication
  - Profile management
  - Session management

- 🤖 **AI Integration**
  - AI-powered features
  - Smart session analytics
  - Automated feedback system

## 🛠️ Technology Stack

### Frontend
- React.js
- Material-UI
- TailwindCSS
- Socket.io-client
- Jitsi Meet SDK
- Firebase
- Vite

### Backend
- Node.js
- Express.js
- Socket.io
- MongoDB
- JWT Authentication
- Environment Variables

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/speakspace.git
   cd speakspace
   ```

2. **Frontend Setup**
   ```bash
   cd speakspace-frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd speakspace-backend
   npm install
   # Create .env file with required environment variables
   npm start
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 📱 Usage

1. **Creating a Session**
   - Log in to your account
   - Click "Create New Session"
   - Set session parameters
   - Share the session link with participants

2. **Joining a Session**
   - Click the session link
   - Enter your name
   - Choose your role (Host/Participant)
   - Join the session

3. **During the Session**
   - Use video controls for camera/mic
   - Chat with participants
   - Share your screen
   - Use AI-powered features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Team Member 1] - Frontend Developer
- [Team Member 2] - Backend Developer
- [Team Member 3] - UI/UX Designer
- [Team Member 4] - AI Integration Specialist

## 📞 Support

For support, email support@speakspace.com or join our Slack channel.

---

Made with ❤️ by the SpeakSpace Team
