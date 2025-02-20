import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to the WebSocket server

// Function to send messages
(window as any).sendMessage = () => {
    const input = document.getElementById('messageInput') as HTMLInputElement;
    const message = input.value.trim();
    if (message) {
        socket.emit('message', { user: 'User', text: message });
        input.value = ''; // Clear input after sending
    }
};

// Listen for incoming messages and display them
socket.on('message', (data: { user: string, text: string }) => {
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
        const newMessage = document.createElement('div');
        newMessage.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
        messagesDiv.appendChild(newMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to latest message
    }
});
