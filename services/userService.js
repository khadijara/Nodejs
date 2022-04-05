const mongoose = require('mongoose');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');



module.exports.findAll = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: User,
            projection: {
                __v: false
            }
        };

        if (dataFromController.skip && dataFromController.limit){
            data.skip = dataFromController.skip;
            data.limit = dataFromController.limit;
        } 

        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-userService-findAll: ', error);
    }
    return responseObj;
}

module.exports.create = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const user = new User(dataFromController);
        const responseFromDatabase = await crudRepository.save(user);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-userService-create: ', error);
    }
    return responseObj;
}

module.exports.update = async function(user) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(user.id)
            },
            model: User,
            projection: {
                __v: false
            },
            updateQuery: {}
        };

        
        if (user.name) data.updateQuery.name = user.name;
        if (user.lastname) data.updateQuery.lastname = user.lastname;
        if (user.email) data.updateQuery.email = user.email;
        if (user.password) data.updateQuery.password = user.password;
        if (user.account) data.updateQuery.account = user.account;
        if (user.admin) data.updateQuery.admin = user.admin;

        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-update: ', e);
    }
    return responseObj;
}

module.exports.delete = async function(userId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(userId)
            },
            model: User,
            projection: {
                __v: false
            }
        };

        const responseFromDatabase = await crudRepository.findOneAndDelete(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-userService-delete: ', error);
    }
    return responseObj;
}