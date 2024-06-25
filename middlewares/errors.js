const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) => {
    err.statusCode = statusCode || 500; 
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        success: false,
        error: err
    })
}