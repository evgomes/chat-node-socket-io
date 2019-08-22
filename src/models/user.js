const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,      
    },
    login: {
        type: String,
        required: true,
        maxlength: 32,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', userSchema);

module.exports = { userSchema, User };