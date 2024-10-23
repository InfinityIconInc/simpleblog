const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostImageSchema = new Schema({
    postImage: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true,
    }
});

const PostImage = mongoose.model('PostImage', PostImageSchema);
module.exports = PostImage;