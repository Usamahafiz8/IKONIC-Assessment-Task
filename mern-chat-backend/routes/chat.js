const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/history/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ timestamp: -1 }).limit(10);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
