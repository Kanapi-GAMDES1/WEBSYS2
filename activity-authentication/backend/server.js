const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

app.use(cors({
  origin: 'http://localhost:4800', 
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
  }
];

function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = findUserByUsername(username);
    
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = findUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'), null);
  }
});

app.post('/login', 
  passport.authenticate('local', { 
    failureMessage: true 
  }),
  (req, res) => {
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      }
    });
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
});

app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a protected route', user: req.user.username });
  } else {
    res.json({ message: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server has started at http://localhost:3000');
});
