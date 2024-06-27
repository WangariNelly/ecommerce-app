const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./products');

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        requitred: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 caracters']
     },
     email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
     },
     password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must exceed 6 characters'],
        select: false
     },
     avator:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
     },
     role: {
        type: String,
        default: 'user'
     },
     createdAt: {
        type: Date,
        default: Date.now
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date
});

module.exports = mongoose('User',userSchema);