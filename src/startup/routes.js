const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieClear = require('../middlewares/cookie-clear');
const session = require('express-session');
const path = require('path');

const login = require('../routes/login');
const signup = require('../routes/signup');

module.exports = function (app) {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        key: 'user_sid',
        secret: 'my-secret-cookie',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));
    app.use(cookieClear);

    const rootPath = path.dirname(require.main.filename);
    app.use('/css', express.static(path.join(rootPath, 'views', 'css')));
    app.use('/js', express.static(path.join(rootPath, 'views', 'js')));

    app.use('/', login);
    app.use('/cadastro', signup);
}