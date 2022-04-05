const roomService = require('../services/roomServices')

// File for Room 
module.exports.findById = async function (req, res) {  // Find room by single id
    const responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    }
    try {
        const roomId = req.params.id ? req.params.id : req.token.roomId
        const responseFromService = await roomService.findById(roomId)
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result
                responseObj.message = 'Room  Find Successfully!!'
                responseObj.status = 200
            } else {
                responseObj.message = 'Sorry!! Room not found!!'
                responseObj.status = 404
            }
        }
    } catch (error) {
        console.log('ERROR-roomController-findById: ', error)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.findAll = async function (req, res) {   // method to find all room in one time
    const responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    }
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit),
        }
        const responseFromService = await roomService.findAll(data)
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result
                responseObj.message = 'All Rooms List available'
                responseObj.status = 200
            } else {
                responseObj.message = 'No rooms found!! '
                responseObj.status = 404
            }
        }
    } catch (error) {
        console.log('ERROR-roomController-findAll: ', error)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.create = async function (req, res) {  // To create Room
    const responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    }
    try {
        const data = req.body
        const responseFromService = await roomService.create(data)
        if (responseFromService.status) {
            responseObj.body = responseFromService.result
            responseObj.message = 'Room Created Successfully!!'
            responseObj.status = 201
        }
    } catch (error) {
        console.log('ERROR-roomController-create: ', error)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.update = async function (req, res) { // To update room
    let responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    }
    try {
        const room = req.body
        room.id = req.params.id
        const responseFromService = await roomService.update(room)
        if (responseFromService.status) {
            responseObj.body = responseFromService.result
            responseObj.message = 'You Update Room Successfully!!'
            responseObj.status = 200
        }
    } catch (error) {
        console.log('ERROR-roomController-update: ', error)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.delete = async function (req, res) {  // To delete room
    let responseObj = { 
        status: 500, 
        message: 'Internal server error' 
    }
    try {
        const roomId = req.params.id
        const responseFromService = await roomService.delete(roomId)
        if (responseFromService.status) {
            responseObj.message = 'Selected Room Removed Successfully'
            responseObj.status = 200
        }
    } catch (error) {
        console.log('ERROR-RoomController-delete: ', error)
    }
    return res.status(responseObj.status).send(responseObj)
}
