const express = require('express');
const multer = require('multer');
const config = require('../config');
const messageService = require('../services/messages');
const { authenticateToken, isUserBlocked } = require('../middlewares/auth');
const { handleError } = require('../utils/errorHandler');

const router = express.Router();
const upload = multer({ dest: config.uploadDir });

router.post('/', authenticateToken, isUserBlocked, (req, res) => {
    const { text } = req.body;
    if (!text) return handleError(res, 400, 'Текст не может быть пустым.');
    messageService.appendText(`${req.user.nickname} > ${text}`);
    res.json({ message: 'Текст успешно добавлен!' });
});

router.post('/image', authenticateToken, isUserBlocked, upload.single('image'), (req, res) => {
    if (!req.file) return handleError(res, 400, 'Файл не загружен.');
    messageService.appendText(`${req.user.nickname} отправил изображение: <img src="/uploads/${req.file.filename}" alt="Image">`);
    res.json({ message: 'Изображение успешно загружено.'
              
