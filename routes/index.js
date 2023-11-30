// routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const meetingRoutes = require('./meetingRoutes');
const path = require('path');

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Meeting routes (including the protected route)
router.use('/meeting', meetingRoutes);

// Serve registration and login forms
router.get('/user-registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user-registration.html'));
});

router.get('/mentor-registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mentor-registration.html'));
});

// router.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/login.html'));
// });
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));// Replace 'path/to/your/project' with the actual path
});
module.exports = router;
