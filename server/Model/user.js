const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    salt:{
        type:String
    },
    roles: {
        type: String,
        default: 'user', 
    },
});




const User = mongoose.model('User', userSchema);

module.exports = User;