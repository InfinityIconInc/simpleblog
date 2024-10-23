const User = require('../models/User');

module.exports = function (req, res, next) {
    if ( req.session.userId ) {
        console.log('session available');
        const u = User.findById(req.session.userId);
        if (!u) {
            return res.redirect('/login');
        } else {
            return res.render('newpost');
        }
    } else {
        return res.redirect('/login');
    }

}