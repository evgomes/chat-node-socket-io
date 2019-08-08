const cookieClear = (req, res, next) => {
    if (req.cookies.user_sid && (!req.session || !req.session.user)) {
        res.clearCookie('user_sid');        
    }

    next();
};

module.exports = cookieClear;