const express = require('express');
const router = express.Router();

const onlyAuthenticated = require('../middlewares/only-authenticated');

const { User } = require('../models/user');

router.get('/', onlyAuthenticated, async (req, res) => {
    const users = await User.find({});
    const usersMap = users.map(u => ({ id: u._id.toString(), login: u.login }))
                          .filter(u => u.id !== req.session.user._id);

    return res.render('chat.hbs', {
        id: req.session.user._id,
        login: req.session.user.login,
        users: usersMap
    });
});

module.exports = router;