const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
    },
    body: {
        type: String,
        required: [true, "Post body is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now,
    },
    postImage: {
        type: String,
        required: false,
        default: "no-image.png",
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost