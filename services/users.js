const fs = require('fs');
const bcrypt = require('bcryptjs');
const config = require('../config');

const usersFile = config.usersFile;

function readUsers() {
    try {
        const data = fs.readFileSync(usersFile);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

module.exports = {
    readUsers,
    writeUsers,
    findUser: (nickname) => readUsers().find(user => user.nickname === nickname),
    createUser: async (nickname, password) => {
        const users = readUsers();
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ nickname, password: hashedPassword, blocked: false });
        writeUsers(users);
    },
    blockUser: (nickname) => {
        const users = readUsers();
        const userIndex = users.findIndex(user => user.nickname === nickname);
        if (userIndex !== -1) {
            users[userIndex].blocked = true;
            writeUsers(users);
        }
    },
    unblockUser: (nickname) => {
        const users = readUsers();
        const userIndex = users.findIndex(user => user.nickname === nickname);
        if (userIndex !== -1) {
            users[userIndex].blocked = false;
            writeUsers(users);
        }
    },
};
