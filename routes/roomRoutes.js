const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const roomScehma = require('../models/joi/roomSchemas');
const tokenValidation = require('../middlewares/tokenValidation');

router.get('/details/:id?',   // Endpoints ---> for looking 1 Room 
    tokenValidation.validate,   // Only if its Authenticate
    joiSchemaValidation.validate(roomScehma.roomIdScehma, 'path'),
    roomController.findById);

router.get('/list',   // Endpoint For all Room
    tokenValidation.validate,
    joiSchemaValidation.validate(roomScehma.getroomSechma, 'query'),
    roomController.findAll);

router.post('/create',
    tokenValidation.validate,
    joiSchemaValidation.validate(roomScehma.createRoomSchema, 'body'),
    roomController.create);

router.put('/update/:id',
    tokenValidation.validate,

    joiSchemaValidation.validate(roomScehma.updateRoomSchema, 'body'),
    roomController.update);

router.delete('/delete/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(roomScehma.roomIdScehma, 'path'),
    roomController.delete);

module.exports = router;