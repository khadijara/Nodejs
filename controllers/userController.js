const userService = require('../services/userService');



module.exports.findAll = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        };
        const responseFromService = await userService.findAll(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Users fetched successfully';
                responseObj.status = 200;
            } else {
                responseObj.message = 'No users found';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-userController-findAll: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.create = async function(req, res) {  // To create user for register
    const responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    };
    try {
        const data = req.body;
        const responseFromService = await userService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'User Register successfully';
            responseObj.status = 201;
        }
    } catch(error) {
        console.log('ERROR-userController-create: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.update = async function(req, res) {  // To update User 
    let responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    };
    try {
        const user = req.body;
        user.id = req.params.id;
        const responseFromService = await userService.update(user);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'UserProfile Updated Successfully';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-userController-update: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.delete = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const userId = req.params.id;
        const responseFromService = await userService.delete(userId);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'User Unregister Successfully';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-userController-delete: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}