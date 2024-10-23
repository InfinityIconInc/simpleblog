const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;