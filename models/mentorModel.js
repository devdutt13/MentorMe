const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  domain: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;

