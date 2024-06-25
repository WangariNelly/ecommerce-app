const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; 
   
    if (process.env.NODE_ENV.includes('DEVELOPMENT')) {
       res.status(err.statusCode).json({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
       })
    }

    if (process.env.NODE_ENV.includes('PRODUCTION')) {
        let error = {...err}

        //Wrong Mongoose object ID Error
        error.message = err.message
        if(err.name == 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        if (err.name === 'ValidationError'){
            const message = Object.values(err.values).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            error: error.stack,
            message: error.message || 'Internal Server Error'
        
        })
    }

};