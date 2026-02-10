# MERN Stack Portfolio Website

A modern, technical & sleek portfolio website built with the MERN stack.

## Features
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations and transitions
- 📝 Blog/Articles section with MongoDB
- 📧 Contact form with email notifications
- 🎨 Easily customizable theme colors
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## Tech Stack
- **Frontend:** React 18, React Router, Framer Motion, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Styling:** CSS3 with CSS Variables for theming
- **Email:** Nodemailer for contact form

## Project Structure
```
portfolio-mern/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── config/        # Configuration files
│   │   ├── context/       # React context (theme)
│   │   ├── styles/        # Global styles
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Server configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   └── server.js
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio-mern
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Configure environment variables

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

Create `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Update your personal information

Edit `client/src/config/personalData.js` with your details

6. Customize theme colors (optional)

Edit `client/src/config/themeColors.js` to change the color scheme

### Running the Application

1. Start MongoDB (if running locally)
```bash
mongod
```

2. Start the server (from server directory)
```bash
npm run dev
```

3. Start the client (from client directory)
```bash
npm start
```

The application will open at `http://localhost:3000`

## Customization Guide

### Personal Information
All personal data is centralized in `client/src/config/personalData.js`. Update:
- Name, tagline, location
- Contact details (email, phone, social links)
- About section
- Skills
- Projects
- Education
- Certifications

### Theme Colors
Change the entire color scheme by editing `client/src/config/themeColors.js`. The theme uses CSS variables for easy customization.

### Blog Posts
Add blog posts through the API or directly in MongoDB. A blog creation interface can be added to the admin panel.

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Render/Railway/Heroku)
Ensure environment variables are set in your hosting platform.

### Database (MongoDB Atlas)
Update `MONGODB_URI` in your environment variables.

## License
MIT

## Author
Harsh Sharma - Software Engineer
