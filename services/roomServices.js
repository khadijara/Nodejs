const mongoose = require('mongoose');
const Room = require('../models/db/roomModel');
const crudRepository = require('../database/crudRepository');

module.exports.findById = async function(roomId) {
    const responseObj = { status: false };
    try {
        const data = {
            _id: mongoose.Types.ObjectId(roomId),
            model: Room,
            projection: {
                __v: false
            }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.status = true;
            responseObj.result = responseFromRepository.result;
        }
    } catch (error){
        console.log('ERROR-roomService-findById: ', error);
    }
    return responseObj;
}

module.exports.findAll = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: Room,
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
        console.log('ERROR-roomService-findAll: ', error);
    }
    return responseObj;
}

module.exports.create = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const room = new Room(dataFromController);
        const responseFromDatabase = await crudRepository.save(room);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-roomService-create: ', error);
    }
    return responseObj;
}

module.exports.update = async function(room) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(room.id)
            },
            model: Room,
            projection: {
                __v: false
            },
            updateQuery: {}
        };
        if (room.hotelId) data.updateQuery.hotelId = room.hotelId;
        if (room.bednumber) data.updateQuery.bednumber = room.bednumber;
        if (room.price) data.updateQuery.price = room.price;
        if(room.created) data.updateQuery.created = room.created;

        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-roomService-update: ', e);
    }
    return responseObj;
}

module.exports.delete = async function(roomId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(roomId)
            },
            model: Room,
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
        console.log('ERROR-roomService-delete: ', error);
    }
    return responseObj;
}