const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchemas = require('../models/joi/userSchemas');

// Endpoints for User --> Create User, Register User, Delete User
router.get('/list',
    joiSchemaValidation.validate(userSchemas.getUserListSchema, 'query'),
    userController.findAll);

router.post('/create', 
    joiSchemaValidation.validate(userSchemas.createUserSchema, 'body'),
    userController.create);

router.put('/update/:id',
    joiSchemaValidation.validate(userSchemas.userIdSchema, 'path'),
    joiSchemaValidation.validate(userSchemas.updateUserSchema, 'body'),
    userController.update);

router.delete('/delete/:id',
    joiSchemaValidation.validate(userSchemas.userIdSchema, 'path'),
    userController.delete);

module.exports = router;