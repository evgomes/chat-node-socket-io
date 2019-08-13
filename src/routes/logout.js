const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    req.session = null;
    res.clearCookie('user_sid');   

    return res.redirect('/');
});

module.exports = router;