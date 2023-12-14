const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('notification.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''; // Clear the input field after sending a message
});

const name = prompt('ENTER YOUR NAME TO JOIN');

socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'left'); // Display the user who joined the chat
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left'); // Display received messages
});

socket.on('left', (name) => {
    append(`${name} left the chat`, 'left'); // Display received messages
});
