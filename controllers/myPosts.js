const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const userid = req.session.userId;
    let posts = await BlogPost.find({userId: userid});
    res.render('myposts', {posts});
}