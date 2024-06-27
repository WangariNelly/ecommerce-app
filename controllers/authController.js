const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Register user => api/v1/register

exports.registerUser = catchAsyncErrors( async (req,res,next) => {
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
    res.status(201).json({
        success: true,
        user
    })
})