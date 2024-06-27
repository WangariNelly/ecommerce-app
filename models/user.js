const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validate } = require('./products');

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        requitred: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 caracters']
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
        minlength: [6, 'Your password must exceed 6 characters'],
        select: false
     },
     avator:{
        public_id: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false
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

//Encrypt password before save
userSchema.pre('save', async function(next){
   if (!this.isModified('password')){
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model('User',userSchema);