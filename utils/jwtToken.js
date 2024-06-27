//create and send token and save inthe cookie

const sendToken = (user, statusCode, res) => {

    //create Jwt token
    const token = user.getJwtToken();

    //options for cookies
    const options = {
        expires: new Date(
            Date.now( + process.env.COOKIE_EXPIRES_TIME * 24 * 60 *60 * 1000 )
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token',token, options).json({
        sucess: true,
        token,
        user
    })
}

module.exports = sendToken;