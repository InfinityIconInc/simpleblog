const User = require('../models/User');
const path = require('path');

module.exports = async (req, res) => {
    console.log (req.body);
    var validationErrors = "Successfully Registered";
    try {

        const avatar = req.files.avatar;
        await avatar.mv ( path.resolve(__dirname, '../public/avatar', avatar.name));

        await User.create({
                ...req.body,
                avatar: '/avatar/' + avatar.name,
            }
        )
        return res.render('index', { validationErrors});
    } catch (err) {
        validationErrors = "";
        if ( err.errors ) {
            validationErrors = Object.keys(err.errors).map((key) => err.errors[key].message);
        } else if ( err.code === 11000 ) {
            validationErrors += "The Email already Exists in DB";
        }
        return res.render ('signup', { validationErrors });
    }
}