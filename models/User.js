const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function(v) {
                // Simple email regex validation
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    lastLogin: {
        type: Date,
        required: true,
        default: Date.now,
    },
    avatar: {
        type: String,
        required: false,
        default: "no-image.png",
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(this.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;