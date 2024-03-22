import express from 'express';
import userRoute from './user/routes/userRoute';
import messageRoute from './message/routes/messageRoute';
import "reflect-metadata";

import { AppDataSource } from "./data-source";
import passport from 'passport';
import { Server, Socket } from 'socket.io';
import socketIo from 'socket.io';
import cors from 'cors';
import http from 'http';

// Create an Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: '*'
}));

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new socketIo.Server(server, {
  cors: {
    origin: '*',
  }
});

// Set up passport for authentication
app.use(passport.initialize());

// Parse JSON request bodies
app.use(express.json());

// Define routes for user and message operations
app.use('/api', userRoute);
app.use('/api', messageRoute);

// Initialize the data source (e.g., database connection)
AppDataSource.initialize();

// Handle Socket.IO connections
io.on('connection', (socket: Socket) => {
  console.log("A new user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle sending messages
  socket.on("send_message", (message) => {
    // Receive a message from a user and broadcast it to other connected users
    io.emit("new_message", message);
  });
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running and listening on port ${port}.`);
});