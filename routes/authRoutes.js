const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const authSchemas = require('../models/joi/authSchemas');

router.post('/login', // Login Api Endpoint
    joiSchemaValidation.validate(authSchemas.loginSchema, 'body'),
    authController.login);

module.exports = router;