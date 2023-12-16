// Import necessary modules
const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentorModel'); // Adjust the path based on your project structure

// Route to render the mentors.ejs template
router.get('/mentors', async (req, res) => {
  try {
    // Fetch all mentors from the database
    const mentors = await Mentor.find();

    // Render the mentors.ejs template with the fetched mentors
    res.render('mentor', { mentors });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
      const mentorId = req.params.id;
      const mentor = await Mentor.findById(mentorId);

      if (!mentor) {
          return res.status(404).json({ message: 'Mentor not found.' });
      }

      // Render the mentor's detailed profile page (profile.ejs) with mentor details
      res.render('profile', { mentor });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
module.exports = router;
