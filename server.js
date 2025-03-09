const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/admin', adminRoutes);

app.listen(config.port, () => {
    console.log(`Сервер запущен на порту ${config.port}`);
});
