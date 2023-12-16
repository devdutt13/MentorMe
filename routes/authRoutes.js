// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Mentor = require('../models/mentorModel')
const router = express.Router();

// User Registration
// Registration route for both users and mentors
router.post('/register', async (req, res) => {
    try {
      const { username, password, name, domain, location, experience, isMentor } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (isMentor) {
        // If registering as a mentor, create a new mentor
        const newMentor = new Mentor({
          username,
          password: hashedPassword,
          name,
          domain,
          location,
          experience,
        });
  
        // Save the mentor to the database
        await newMentor.save();
      } else {
        // If not a mentor, assume user registration
        const newUser = new User({
          username,
          password: hashedPassword,
        });
  
        // Save the user to the database
        await newUser.save();
      }
  
      res.json({ message: 'Registration successful.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/login/user', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT for the user
      const token = jwt.sign({ userId: user._id, username: user.username, role: 'user' }, 'your-secret-key');

      // Send the JWT to the client
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/login/mentor', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the mentor by username
    const mentor = await Mentor.findOne({ username });

    // Check if the mentor exists and the password is correct
    if (mentor && await bcrypt.compare(password, mentor.password)) {
      // Generate a JWT for the mentor
      const token = jwt.sign({ userId: mentor._id, username: mentor.username, role: 'mentor' }, 'your-secret-key');

      // Send the JWT to the client
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
