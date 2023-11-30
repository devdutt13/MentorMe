// routes/meetingRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const Mentor = require('../models/mentorModel');
const Meeting = require('../models/meetingModel');

const router = express.Router();

// Protected route: Book a meeting
router.post('/book-meeting', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; // Retrieve userId from decoded JWT
    const { mentorId, date, timeSlot } = req.body;

    // Combine date and time to create a JavaScript Date object
    const combinedDateTime = new Date(`${date}T${timeSlot.split(' - ')[0]}`);
    
    // Check if the selected time slot is available
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    if (!mentor.availableTimeSlots || !mentor.availableTimeSlots.includes(combinedDateTime)) {
      return res.status(400).json({ message: 'Selected time slot is not available.' });
    }

    // Book the meeting
    const meeting = new Meeting({ userId, mentorId, timeSlot: combinedDateTime });
    await meeting.save();

    // Update mentor's available time slots (optional: remove the booked slot)
    mentor.availableTimeSlots = mentor.availableTimeSlots.filter(slot => !slot.equals(combinedDateTime));
    await mentor.save();

    res.json({ message: 'Meeting booked successfully.' });
  } catch (error) {
    console.error(error); // Log the full error for debugging purposes
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

module.exports = router;
