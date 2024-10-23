const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const user = User.findOne({ email: req.body.email })
        .then(async user => {
            if (user) {
                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if (isMatch) {
                    const {id, email, password} = user;
                    req.session.userId = user._id;
                    console.log(id, email, password);
                    res.redirect(`/`);
                } else console.log("Wrong Password");
            }
        })
        .catch( err => {
            console.log( err );
        })
}