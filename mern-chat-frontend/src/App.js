import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', (typingMessage) => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    socket.on('notification', (notification) => {
      console.log(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (room) {
      socket.emit('joinRoom', { room });
      fetch(`http://localhost:5000/chat/history/${room}`)
        .then(response => response.json())
        .then(data => setMessages(data.reverse()));
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit('sendMessage', { room, message });
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { room });
  };

  const createRoom = () => {
    if (newRoom) {
      fetch('http://localhost:5000/chat/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newRoom }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            setRoom(newRoom);
            setNewRoom('');
            joinRoom();
          }
        });
    }
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        <input
          type="text"
          placeholder="New Room Name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
        />
        <button onClick={createRoom}>Create Room</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      {isTyping && <p>Someone is typing...</p>}
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
