const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    }
});

module.exports = userSchema;
