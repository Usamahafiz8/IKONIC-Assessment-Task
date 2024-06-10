const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRouter = require('./routes/chat');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/chat', chatRouter);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    io.to(room).emit('notification', `${socket.id} has joined the room`);
  });

  socket.on('leaveRoom', ({ room }) => {
    socket.leave(room);
    io.to(room).emit('notification', `${socket.id} has left the room`);
  });

  socket.on('sendMessage', ({ room, message }) => {
    io.to(room).emit('message', message);
  });

  socket.on('typing', ({ room }) => {
    socket.to(room).emit('typing', `${socket.id} is typing...`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
