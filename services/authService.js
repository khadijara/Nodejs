const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');

module.exports.login = async function(user) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                mail: user.mail,
                password: user.password
            },
            model: User
        };

        const responseFromDatabase = await crudRepository.findOne(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-authService-login: ', error);
    }
    return responseObj;
}