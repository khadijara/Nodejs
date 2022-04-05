const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
// Controller for Login Authentication
module.exports.login = async function (req, res) {
    let responseObj = {
        status: 500,
        message: 'Internal server error'
    };
    try {
        const user = req.body;
        const responseFromService = await authService.login(user);
        if (responseFromService.status) {
            if (responseFromService.result) {
                const token = jwt.sign(
                    {
                        userId: responseFromService.result._id
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: '30m' }    // Token will expires in 30 minutes
                );
                responseObj.body = { token: token };
                responseObj.message = 'User authenticated successfully!! Token will expires in 30 minutes.';
                responseObj.status = 200;
            } else {
                responseObj.message = 'User not register! First Register user';
                responseObj.status = 400;
            }
        }
    } catch (error) {
        console.log('ERROR-authController-login: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}