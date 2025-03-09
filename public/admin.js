const usersDiv = document.getElementById('users');
const nicknameInput = document.getElementById('nicknameInput');
const blockButton = document.getElementById('blockButton');
const unblockButton = document.getElementById('unblockButton');
const adminMessageInput = document.getElementById('adminMessageInput');
const sendAdminMessageButton = document.getElementById('sendAdminMessageButton');
const messageIndexInput = document.getElementById('messageIndexInput');
const deleteMessageButton = document.getElementById('deleteMessageButton');
const clearChatButton = document.getElementById('clearChatButton');
const getUsersButton = document.getElementById('getUsersButton');

function loadUsers() {
    fetch('/admin/users')
        .then(response => response.json())
        .then(users => {
            usersDiv.innerHTML = users.map(user => `<div>${user.nickname} (${user.blocked ? 'Заблокирован' : 'Активен'})</div>`).join('');
        });
}

function blockUser() {
    fetch('/admin/block-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nicknameInput.value })
    }).then(loadUsers);
}

function unblockUser() {
    fetch('/admin/unblock-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nicknameInput.value })
    }).then(loadUsers);
}

function sendAdminMessage() {
    fetch('/admin/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: adminMessageInput.value })
    }).then(() => adminMessageInput.value = '');
}

function deleteMessage() {
    fetch('/admin/delete-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: messageIndexInput.value })
    }).then(() => messageIndexInput.value = '');
}

function clearChat() {
    fetch('/admin/clear-chat', { method: 'POST' }).then(loadMessages);
}

blockButton.addEventListener('click', blockUser);
unblockButton.addEventListener('click', unblockUser);
sendAdminMessageButton.addEventListener('click', sendAdminMessage);
deleteMessageButton.addEventListener('click', deleteMessage);
clearChatButton.addEventListener('click', clearChat);
getUsersButton.addEventListener('click', loadUsers);

loadUsers();
