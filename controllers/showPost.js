const BlogPost = require('../models/BlogPost');

module.exports = async ( req, res ) => {
    const slug = req.params.slug;

        const post = await BlogPost.findOne({ postSlug: slug });
        console.log(post.title);
        return res.render('showpost', {post});
}