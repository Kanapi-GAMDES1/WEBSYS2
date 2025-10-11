# Complete Authentication System Setup

This project implements a full-stack authentication system using React frontend and Node.js backend with Passport.js.

## Project Structure

```
activity-authentication-frontend/
├── src/                    # React frontend
│   ├── components/
│   ├── hooks/
│   │   └── useAuthentication.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── LoginPage.js
│   └── App.js
└── backend/                # Node.js backend
    ├── server.js
    ├── package.json
    └── README.md
```

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend will run on `http://localhost:3000`

### 2. Frontend Setup

```bash
# Navigate to root directory (if not already there)
cd ..

# Install dependencies
npm install

# Start the frontend
npm start
```

The frontend will run on `http://localhost:4800`

## Testing the Application

1. **Start both servers** (backend on port 3000, frontend on port 4800)
2. **Open browser** to `http://localhost:4800`
3. **Login with**:
   - Username: `admin`
   - Password: `password`
4. **Test logout** by clicking the logout button

## Key Features Implemented

### Backend (Passport.js)
- ✅ Express server with CORS support
- ✅ Passport.js initialization and configuration
- ✅ LocalStrategy for username/password authentication
- ✅ Session management with express-session
- ✅ Password hashing with bcryptjs
- ✅ Serialization and deserialization
- ✅ Login/logout routes with Passport middleware
- ✅ Authentication status checking

### Frontend (React)
- ✅ Form handling with controlled inputs
- ✅ State management for authentication
- ✅ Error handling and user feedback
- ✅ Loading states during authentication
- ✅ Integration with backend API
- ✅ Session-based authentication

## Authentication Flow

1. **User enters credentials** in login form
2. **Frontend sends POST request** to `/login` endpoint
3. **Passport.js validates credentials** using LocalStrategy
4. **Session is created** and user is serialized
5. **Success response** sent to frontend
6. **User is redirected** to home page
7. **Logout clears session** and redirects to login

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CORS configuration
- Input validation
- Error handling
- Secure session cookies

## Development Notes

- Backend uses in-memory user storage (replace with database in production)
- Session secret should be changed in production
- HTTPS should be enabled in production
- Add proper error logging in production
