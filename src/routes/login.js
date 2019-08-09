const express = require('express');
const sessionChecker = require('../middlewares/session-checker');

const router = express.Router();
const _ = require('lodash');

const { User } = require('../models/user');
const { hashMatches } = require('../helpers/cryptography');

router.get('/', sessionChecker, (_, res) => {
    return res.render('index.hbs');
});

router.post('/', async (req, res) => {
    const credentials = _.pick(req.body, ['login', 'password']);

    const user = await User.findOne({ login: credentials.login });
    if (!user) {
        return res.send({ success: false, message: 'Credenciais inválidas.' });
    }

    const passwordMatches = await hashMatches(credentials.password, user.password);
    if (!passwordMatches) {
        return res.send({ success: false, message: 'Credenciais inválidas.' });
    }

    req.session.user = user;
    return res.send({ success: true });
});

module.exports = router;