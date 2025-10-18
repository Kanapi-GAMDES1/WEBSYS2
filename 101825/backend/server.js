const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const multer = require('multer');
const path = require('path');

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
    password: 'password'
  },
  {
    id: 2,
    username: 'student',
    password: 'password'
  }
];

function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

function findUserById(id) {
  return users.find(user => user.id === id);
}

passport.use(new LocalStrategy((username, password, done) => {
  const user = findUserByUsername(username);
  done(null, user && password === user.password ? user : false);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, findUserById(id))
});

app.post('/login', passport.authenticate('local'), (req, res) => res.json({ success: true }));

const upload = multer({ 
  dest: 'uploads/'
});

const requireAuth = (req, res, next) => req.isAuthenticated() ? next() : res.send();
const requireAdmin = (req, res, next) => req.isAuthenticated() && req.user.username === 'admin' ? next() : res.send();
const requireAdminOrStudent = (req, res, next) => req.isAuthenticated() && (req.user.username === 'admin' || req.user.username === 'student') ? next() : res.send();

app.post('/api/upload', requireAuth, requireAdmin, upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.get('/api/uploads', requireAuth, requireAdminOrStudent, (req, res) => {
  res.download(path.join(__dirname, 'uploads', req.query.filename));
});

app.listen(3000, () => {
  console.log('Server has started at http://localhost:3000');
});
