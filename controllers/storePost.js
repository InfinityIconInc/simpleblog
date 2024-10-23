const BlogPost = require(`../models/BlogPost.js`);
const path = require("path");

module.exports = (req, res) => {
    console.log( req.body);
    const {title, body } = req.body;
    const postimage = req.files.postimage;
    if ( postimage != '' ) {
        postimage.mv(path.resolve(__dirname, '../public/postimages', postimage.name))
            .then((post) => {
                console.log("Image Uploaded");
            })
            .catch(err => {
                console.log("Error Uploading Image");
            });
    }
    BlogPost.create({
        ...req.body,
        postImage: '/postimages/' + postimage.name,
        userId: req.session.userId
    })
        .then((blogPost) => {
            console.log("Post Created");
            return res.redirect("/");
        })
        .catch( err => {
            console.log("Error Creating Post");
            return res.redirect("/");
        })
}