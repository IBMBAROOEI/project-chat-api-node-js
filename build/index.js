"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./user/routes/userRoute"));
const messageRoute_1 = __importDefault(require("./message/routes/messageRoute"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const passport_1 = __importDefault(require("passport"));
const socket_io_1 = __importDefault(require("socket.io"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// Create an Express app
const app = (0, express_1.default)();
// Enable Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)({
    origin: '*'
}));
// Create an HTTP server using the Express app
const server = http_1.default.createServer(app);
// Initialize Socket.IO
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*',
    }
});
// Set up passport for authentication
app.use(passport_1.default.initialize());
// Parse JSON request bodies
app.use(express_1.default.json());
// Define routes for user and message operations
app.use('/api', userRoute_1.default);
app.use('/api', messageRoute_1.default);
// Initialize the data source (e.g., database connection)
data_source_1.AppDataSource.initialize();
// Handle Socket.IO connections
// io.on('connection', (socket: Socket) => {
//   console.log("A new user connected");
//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
//   // Handle sending messages
// socket.on("send_message", (message) => {
//   // Receive a message from a user and broadcast it to other connected users
//   io.emit("new_message", message);
// });
// });
// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running and listening on port ${port}.`);
});
