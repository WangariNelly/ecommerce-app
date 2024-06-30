const User = require('../models/user');
const crypto = require('crypto')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const { use } = require('../routes/auth');

//Register user => api/v1/register

exports.registerUser = catchAsyncErrors( async(req,res,next) => {
    const { name, email, password } = req.body;

    const user = await User.create ({
        name,
        email,
        password,
        avator: {
            public_id: '',
            url: ''
        }
    })

    sendToken(user, 200, res)
})

//login user /api/v1/login
exports.loginUser = catchAsyncErrors( async( req,res,next) => {
    const { email, password } = req.body

    //check if email and pasword is entered by user 
    if (!email || !password){
        return next(new ErrorHandler('Please enter valid email $ password', 400));
    }
    //finding user in DB
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
     
    //checks if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 401));
    };

    sendToken(user, 200, res)
});

//Forgot password => /api/vi/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();

    //create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nif you have not requested this email,then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
    }
})


//Reset password => /api/vi/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
     //hash URL Token
     const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
 })
   if(!user){
    return next(new ErrorHandler('Password token is Invalid or has expired', 400))
   }

   if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler('Password does not match, 400'))
   }

   //setup new password
   user.password = req.body.password;

   user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

await user.save();

sendToken(user, 200, res);

});

//Get details of current logged in User => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req,res,next) => {
 const user = await User.findById(req.user.id);

 res.status(200).json({
    success: true,
    user
 })
});

//Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id).select('+password');
    
    //check if previous password 
    const isMatched = await user.comparePassword(req.body.oldpassword);
    if(!isMatched) {
        return next(new ErrorHandler('Old password is incorrect',400));
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
});

//update the user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }) 
    res.status(200).json({
        success: true,
        user
    })
})

//logout users /api/v1/logout
exports.logout = catchAsyncErrors( async( req,res,next) => {
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})