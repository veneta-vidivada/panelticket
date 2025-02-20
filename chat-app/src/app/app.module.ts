const express = require('express'); 
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" } // Allow all connections
});

io.on('connection', (socket: { on: (arg0: string, arg1: { (data: any): void; (): void; }) => void; }) => {
    console.log('A user connected');

    socket.on('message', (data: any) => {
        io.emit('message', data); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
