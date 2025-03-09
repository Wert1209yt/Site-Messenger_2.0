const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/users');
const { handleError } = require('../utils/errorHandler');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) return handleError(res, 400, 'Никнейм и пароль обязательны.');
    if (userService.findUser(nickname)) return handleError(res, 400, 'Никнейм уже занят.');

    try {
        await userService.createUser(nickname, password);
        res.status(201).json({ message: 'Пользователь зарегистрирован.' });
    } catch (err) {
        handleError(res, 500, 'Ошибка сервера при регистрации.');
    }
});

router.post('/login', (req, res) => {
    const { nickname, password } = req.body;
    if (!nickname || !password) return handleError(res, 400, 'Никнейм и пароль обязательны.');

    const user = userService.findUser(nickname);
    if (!user) return handleError(res, 400, 'Неверный никнейм или пароль.');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return handleError(res, 400, 'Неверный никнейм или пароль.');

    const token = jwt.sign({ nickname: user.nickname }, config.secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Вход выполнен успешно!' });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Вы вышли из аккаунта.' });
});

module.exports = router;
