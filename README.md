# YD Advisory - Financial Consulting Platform

A modern, full-stack financial consulting platform built with React.js, Node.js, and MongoDB. This application provides comprehensive financial services including investment management, financial planning, risk assessment, and more.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX**: Clean, responsive design with teal green theme
- **Interactive Components**: Animated sections with Framer Motion
- **Form Handling**: Contact forms with validation using React Hook Form
- **API Integration**: Seamless communication with backend services
- **Responsive Design**: Mobile-first approach with Bootstrap-inspired styling
- **Routing**: Client-side routing with React Router

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication system
- **Data Validation**: Input validation using express-validator
- **Security**: Helmet, CORS, rate limiting, and other security measures
- **Error Handling**: Comprehensive error handling middleware
- **Logging**: Morgan logging for development and production

### Database (MongoDB)
- **Flexible Schema**: Mongoose ODM for MongoDB
- **Data Models**: User, Service, Team, Blog, Contact, Portfolio models
- **Indexing**: Optimized queries with proper indexing
- **Validation**: Schema-level validation

## 📁 Project Structure

```
yd-advisory/
├── client/                 # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── styles/        # Styled-components and themes
│   │   └── App.js
│   └── package.json
├── server/                # Node.js Backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/           # Utility functions
│   ├── index.js         # Server entry point
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React.js 18.2.0** - UI library
- **React Router 6.3.0** - Client-side routing
- **Styled Components 5.3.5** - CSS-in-JS styling
- **Framer Motion 7.2.1** - Animation library
- **React Hook Form 7.34.2** - Form handling
- **Axios 0.27.2** - HTTP client
- **React Icons 4.4.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 7.0.3** - ODM for MongoDB
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Create a new GitHub repo and push code**
   ```bash
   # Initialize git (if not already)
   git init
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   
   # Optional: set default branch to main
   git branch -M main
   
   # Commit current code
   git add -A
   git commit -m "Initial commit: YD Advisory"
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Clone the repository (fresh machine)**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

3. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both client and server directories:
   
   **server/.env**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/yd-advisory
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:3000
   ```
   
   **client/.env**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the application**
   
   **Development mode (recommended)**
   ```bash
   # Start both client and server concurrently
   npm run dev
   ```
   
   **Or start individually**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm run dev
   
   # Terminal 2 - Start client
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - API Health Check: http://localhost:5000/api/health

### Common Git Commands

```bash
# Check status
git status

# Pull latest changes
git pull origin main

# Create and switch to a new branch
git checkout -b feature/my-change

# Commit and push
git add -A && git commit -m "Describe your change" && git push -u origin feature/my-change

# Merge via PR on GitHub, then pull
git checkout main && git pull origin main
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password
- `POST /api/auth/logout` - Logout

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `PATCH /api/contact/:id/status` - Update contact status
- `PATCH /api/contact/:id/read` - Mark as read

### Services
- `GET /api/services` - Get all services
- `GET /api/services/featured` - Get featured services
- `GET /api/services/:slug` - Get service by slug
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/featured` - Get featured team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Create team member (admin)
- `PUT /api/team/:id` - Update team member (admin)
- `DELETE /api/team/:id` - Delete team member (admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/featured` - Get featured blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `GET /api/blog/category/:category` - Get posts by category
- `GET /api/blog/search` - Search blog posts
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/featured` - Get featured portfolio items
- `GET /api/portfolio/:id` - Get portfolio item by ID
- `POST /api/portfolio` - Create portfolio item (admin)
- `PUT /api/portfolio/:id` - Update portfolio item (admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin)

## 🎨 Theming

The application uses a teal green theme with white shades with the following color palette:

```javascript
const theme = {
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a'
    },
    accent: {
      gold: '#f59e0b',
      teal: '#14b8a6',
      mint: '#6ee7b7'
    }
  }
};
```

## 🔧 Development

### Available Scripts

**Root level:**
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run start` - Start both client and server in production mode

**Client:**
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

**Server:**
- `npm run dev` - Start server with nodemon
- `npm start` - Start server in production mode
- `npm test` - Run tests

### Code Structure

- **Components**: Reusable UI components in `client/src/components/`
- **Pages**: Route components in `client/src/pages/`
- **Services**: API service functions in `client/src/services/`
- **Styles**: Theme and global styles in `client/src/styles/`
- **Models**: Database models in `server/models/`
- **Routes**: API routes in `server/routes/`

## 🚀 Deployment

### Frontend (React)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend (Node.js)
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to your hosting service (Heroku, DigitalOcean, AWS, etc.)

### Database (MongoDB)
- Use MongoDB Atlas for cloud hosting
- Or deploy MongoDB on your preferred cloud provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@ydadvisory.com or create an issue in the repository.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Styled Components for CSS-in-JS solution
- Framer Motion for smooth animations
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution