// meetingModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  timeSlot: { type: Date, required: true },
  // Other meeting-related fields you may need
  // ...
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
