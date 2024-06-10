const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Message = require('../models/Message');

// Get message history
router.get('/history/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ timestamp: -1 }).limit(10);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new room
router.post('/room', async (req, res) => {
  const { name } = req.body;

  try {
    const existingRoom = await Room.findOne({ name });

    if (existingRoom) {
      return res.status(400).json({ error: 'Room already exists' });
    }

    const newRoom = new Room({ name });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
