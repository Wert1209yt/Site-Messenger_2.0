const jwt = require('jsonwebtoken');
const config = require('../config');
const { handleError } = require('../utils/errorHandler');
const userService = require('../services/users');

module.exports = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return handleError(res, 401, 'Необходима аутентификация.');

        jwt.verify(token, config.secretKey, (err, user) => {
            if (err) return handleError(res, 403, 'Токен недействителен.');
            req.user = user;
            next();
        });
    },
    isAdmin: (req, res, next) => {
        if (req.body.password === config.adminPassword) {
            next();
        } else {
            handleError(res, 403, 'Неверный пароль администратора.');
        }
    },
    isUserBlocked: (req, res, next) => {
        const user = userService.findUser(req.user.nickname);
        if (user && user.blocked) {
            return handleError(res, 403, 'Ваш аккаунт заблокирован.');
        }
        next();
    },
};
