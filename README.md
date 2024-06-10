# Real-Time Chat Application

## Introduction

This project is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. It allows users to join different chat rooms, send private messages, see typing indicators, receive notifications when someone joins or leaves a room, and view the last 10 messages exchanged in a room.

## Features

- **Multiple Rooms**: Users can join different rooms and send messages within those rooms.
- **Private Messages**: Users can send private messages to specific individuals within the same room.
- **Typing Indicator**: Shows when a user is typing a message.
- **Notifications**: Notifies users when someone joins or leaves the room.
- **Message History**: Stores and displays the last 10 messages exchanged in a room for new users joining.

## Project Structure

```
real-time-chat/
├── frontend/               # Frontend application (React)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── mern-chat-backend/      # Backend application (Express and Socket.io)
│   ├── models/
│   │   ├── Message.js
│   │   └── Room.js
│   ├── node_modules/
│   ├── routes/
│   │   └── chat.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── README.md
```

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/real-time-chat.git
   cd real-time-chat
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # For backend
   cd mern-chat-backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

## Configuration

1. Create a `.env` file in the `mern-chat-backend` directory and add the following environment variables:

   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/chatapp
   ```

## Running the Application

### Backend

1. Start the backend server:
   ```bash
   cd mern-chat-backend
   nodemon server.js
   ```

### Frontend

1. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

### Accessing the Application

Once both the backend and frontend servers are running, you can access the chat application by navigating to `http://localhost:3000` in your web browser.

## Usage

1. Enter a room name to join or create a room.
2. Send messages within the room.
3. View notifications when users join or leave the room.
4. See typing indicators when someone is typing a message.
5. Access the last 10 messages in the room history.

## Technologies Used

- **Frontend**: React, Socket.io-client
- **Backend**: Node.js, Express, Socket.io, MongoDB, Mongoose
- **Dev Tools**: Nodemon, dotenv

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features to suggest.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

