const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


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

    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token
    })
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
    }
    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token
    })
})