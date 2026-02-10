# MERN Stack Portfolio - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🚀 Quick Start (5 Minutes)

### 1. Initial Setup

```bash
# Navigate to project root
cd portfolio-mern

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server (.env file in /server directory):**
```bash
cd server
cp .env.example .env
# Edit .env with your details
```

Required variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=http://localhost:3000
```

**Client (.env file in /client directory):**
```bash
cd client
cp .env.example .env
```

Required variables:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Update Your Personal Information

**Edit `client/src/config/personalData.js`:**
- Update name, contact info, social links
- Add your projects
- Update education and experience
- Add certifications

**Edit `client/src/config/themeColors.js` (Optional):**
- Change primary colors
- Or uncomment a preset theme

### 4. Run the Application

**Terminal 1 - Start MongoDB (if running locally):**
```bash
mongod
```

**Terminal 2 - Start Backend Server:**
```bash
cd server
npm run dev
```
Server runs at: http://localhost:5000

**Terminal 3 - Start Frontend:**
```bash
cd client
npm start
```
Frontend opens at: http://localhost:3000

## 📧 Gmail App Password Setup

To enable the contact form email functionality:

1. Enable 2-Factor Authentication on your Google account
2. Go to: Google Account > Security > 2-Step Verification > App passwords
3. Generate a password for "Mail" app
4. Copy the 16-character password
5. Add it to `EMAIL_PASS` in server/.env

## 🎨 Customization Guide

### Changing Theme Colors

Open `client/src/config/themeColors.js`:

**Option 1 - Use a Preset:**
```javascript
// Uncomment one of these:
applyPresetTheme(purpleTheme);  // Modern purple
applyPresetTheme(greenTheme);   // Growth-oriented green
applyPresetTheme(orangeTheme);  // Energetic orange
```

**Option 2 - Custom Colors:**
```javascript
export const themeColors = {
  light: {
    primary: '#YOUR_COLOR',     // Change this
    primaryDark: '#DARKER_SHADE',
    primaryLight: '#LIGHTER_SHADE',
    // ... rest stays same
  }
}
```

### Adding Projects

Edit `client/src/config/personalData.js`:

```javascript
projects: [
  {
    id: 1,
    title: "Your Project Name",
    description: "Brief description",
    image: "/assets/project-image.jpg",  // Add image to public/assets
    technologies: ["React", "Node.js"],
    github: "https://github.com/...",
    demo: "https://...",
    category: "Web Application",
    status: "Completed"
  }
]
```

### Adding Blog Posts

Two methods:

**Method 1 - Via API (Postman/Thunder Client):**
```
POST http://localhost:5000/api/blog
Content-Type: application/json

{
  "title": "Your Blog Title",
  "excerpt": "Brief summary",
  "content": "Full content in Markdown",
  "tags": ["JavaScript", "React"],
  "category": "Tutorial",
  "published": true
}
```

**Method 2 - Directly in MongoDB:**
Use MongoDB Compass or CLI to add documents to the `blogs` collection.

## 📦 Deployment

### Frontend (Vercel - Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set environment variable:
   - `REACT_APP_API_URL`: Your backend URL
5. Deploy!

### Backend (Render/Railway)

**Render:**
1. Create account at [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Add environment variables
7. Deploy!

**Railway:**
1. Create account at [Railway](https://railway.app)
2. New Project > Deploy from GitHub
3. Add environment variables
4. Deploy!

### Database (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in your hosting platform

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 PID  # Mac/Linux
taskkill /PID PID /F  # Windows
```

### MongoDB Connection Failed
- Check if MongoDB is running
- Verify connection string
- Check firewall settings

### Email Not Sending
- Verify Gmail app password
- Check EMAIL_USER and EMAIL_PASS in .env
- Ensure 2FA is enabled on Google account

### React App Not Loading
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📁 Project Structure

```
portfolio-mern/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Navbar, Footer
│   │   ├── pages/         # Home, About, Projects, Blog, Contact
│   │   ├── config/        # personalData.js, themeColors.js
│   │   ├── context/       # ThemeContext
│   │   ├── styles/        # Global CSS
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Email configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   └── server.js         # Entry point
└── README.md
```

## 🎯 Next Steps

1. ✅ Update personal information in `personalData.js`
2. ✅ Choose and apply theme colors
3. ✅ Add your project images to `public/assets/`
4. ✅ Test contact form
5. ✅ Add blog posts
6. ✅ Deploy to production
7. ✅ Share your portfolio!

## 💡 Tips

- Keep `personalData.js` updated as you complete new projects
- Add project screenshots for better visual appeal
- Write regular blog posts to showcase expertise
- Monitor contact form submissions via MongoDB
- Update meta tags for better SEO

## 🆘 Need Help?

- Check the README.md for detailed information
- Review the code comments
- Check browser console for errors
- Verify all environment variables are set correctly

## 📝 License

MIT License - Feel free to use this template for your own portfolio!

---

Built with ❤️ using the MERN Stack
