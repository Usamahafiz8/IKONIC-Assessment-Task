
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('Room', RoomSchema);
