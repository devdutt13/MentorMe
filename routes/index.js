// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const meetingRoutes = require('./meetingRoutes');
const mentorRoutes = require('./mentorRoutes');
const path = require('path');

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Meeting routes (including the protected route)
router.use('/meeting', meetingRoutes);
router.use('/mentor', mentorRoutes);
// Serve registration and login forms
router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registration.html'));
});

router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registration.html'));
});
// router.get('/mentor-search', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/mentor-search.html'));
// });
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));// Replace 'path/to/your/project' with the actual path
});
module.exports = router;
