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


        //Validation error for Mongo
        if (err.name === 'ValidationError'){
            const message = Object.values(err.values).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        //Handling  Mongoose duplicate errors

        if (err.code === 11000){
            const message = `Duplicate ${Object.keys(error.keyValue)} entered`
            error = new ErrorHandler(message, 400);
        };
        //Handling wrong JWT error
        if (err.name === 'JsonWebTokenError'){
            const message = 'JSON web Token is Invalid.Try Again!!'
            error = new ErrorHandler(message, 400);
        };

          //Handling EXpired JWT error
          if (err.name === 'TokenExpiredError'){
            const message = 'JSON web Token is Expired.Try Again!!'
            error = new ErrorHandler(message, 400);
        }



        res.status(error.statusCode).json({
            success: false,
            // error: error,
            message: error.message || 'Internal Server Error'
        
        })
    }

};