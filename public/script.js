const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const imageInput = document.getElementById('imageInput');
const sendImageButton = document.getElementById('sendImageButton');
const voiceInput = document.getElementById('voiceInput');
const sendVoiceButton = document.getElementById('sendVoiceButton');
const logoutButton = document.getElementById('logoutButton');

function loadMessages() {
    fetch('/messages') // Исправленный URL
        .then(response => response.text())
        .then(data => messagesDiv.innerHTML = data);
}

function sendMessage() {
    fetch('/messages', { // Исправленный URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageInput.value })
    }).then(loadMessages);
    messageInput.value = '';
}

function sendImage() {
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    fetch('/messages/image', { method: 'POST', body: formData }).then(loadMessages); // Исправленный URL
    imageInput.value = '';
}

function sendVoice() {
    const formData = new FormData();
    formData.append('voice', voiceInput.files[0]);
    fetch('/messages/voice', { method: 'POST', body: formData }).then(loadMessages); // Исправленный URL
    voiceInput.value = '';
}

function logout() {
    fetch('/auth/logout', { method: 'POST' }).then(() => window.location.href = '/'); // Исправленный URL
}

sendButton.addEventListener('click', sendMessage);
sendImageButton.addEventListener('click', sendImage);
sendVoiceButton.addEventListener('click', sendVoice);
logoutButton.addEventListener('click', logout);

setInterval(loadMessages, 1000);
