const express = require('express');
const onlyNotAuthenticated = require('../middlewares/only-not-authenticated');

const router = express.Router();
const _ = require('lodash');

const { User } = require('../models/user');
const { hash } = require('../helpers/cryptography');

router.get('/', onlyNotAuthenticated, (_, res) => {
    return res.render('signup.hbs');
});

router.post('/', async (req, res) => {
    const user = _.pick(req.body, ['name', 'login', 'password', 'passwordConfirmation']);

    if (user.password !== user.passwordConfirmation) {
        return res.send({ success: false, message: 'Senha e confirmação de senha não conferem.' });
    }

    const existingUser = await User.findOne({ login: user.login });
    if (existingUser) {
        return res.send({ success: false, message: 'Login já está em uso.' });
    }

    const userToSave = new User({
        ...user,
        password: await hash(user.password),
    });

    await userToSave.save();
    return res.send({ success: true, message: 'Cadastrado com sucesso!' });
});

module.exports = router;