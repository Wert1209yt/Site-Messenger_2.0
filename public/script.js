const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const imageInput = document.getElementById('imageInput');
const sendImageButton = document.getElementById('sendImageButton');
const voiceInput = document.getElementById('voiceInput');
const sendVoiceButton = document.getElementById('sendVoiceButton');
const authPanel = document.getElementById('authPanel');
const regNickname = document.getElementById('regNickname');
const regPassword = document.getElementById('regPassword');
const registerButton = document.getElementById('registerButton');
const loginNickname = document.getElementById('loginNickname');
const loginPassword = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const messageForm = document.getElementById('messageForm');

function showMessageForm() {
    authPanel.style.display = 'none';
    messageForm.style.display = 'block';
    logoutButton.style.display = 'block';
}

function showAuthPanel() {
    authPanel.style.display = 'block';
    messageForm.style.display = 'none';
    logoutButton.style.display = 'none';
}

function register() {
    fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: regNickname.value, password: regPassword.value })
    }).then(response => {
        if (response.ok) {
            alert('Регистрация прошла успешно!');
            showAuthPanel();
        } else {
            alert('Ошибка регистрации.');
        }
    });
}

function login() {
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: loginNickname.value, password: loginPassword.value })
    }).then(response => {
        if (response.ok) {
            alert('Вход выполнен успешно!');
            showMessageForm();
        } else {
            alert('Ошибка входа.');
        }
    });
}

function logout() {
    fetch('/auth/logout', { method: 'POST' }).then(() => {
        showAuthPanel();
    });
}

function loadMessages() {
    fetch('/messages')
        .then(response => response.text())
        .then(data => messagesDiv.innerHTML = data);
}

function sendMessage() {
    fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageInput.value })
    }).then(loadMessages);
    messageInput.value = '';
}

function sendImage() {
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    fetch('/messages/image', { method: 'POST', body: formData }).then(loadMessages);
    imageInput.value = '';
}

function sendVoice() {
    const formData = new FormData();
    formData.append('voice', voiceInput.files[0]);
    fetch('/messages/voice', { method: 'POST', body: formData }).then(loadMessages);
    voiceInput.value = '';
}

registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
sendButton.addEventListener('click', sendMessage);
sendImageButton.addEventListener('click', sendImage);
sendVoiceButton.addEventListener('click', sendVoice);

function checkAuth() {
    fetch('/messages')
        .then(response => {
            if (response.ok) {
                showMessageForm();
            } else {
                showAuthPanel();
            }
        });
}

checkAuth();

setInterval(loadMessages, 1000);
