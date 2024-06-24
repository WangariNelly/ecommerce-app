// global error class
class ErrorHandler extends Error {
    constructor(message, statusCode ){
        super(message);
        this.statusCodeCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.export = ErrorHandler;