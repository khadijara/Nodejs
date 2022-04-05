const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
// validation for Users

module.exports = {
    userIdSchema: Joi.object({
        id: Joi.objectId().required()
    }),

    getUserListSchema: Joi.object({
        skip: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional()
    }).and('skip', 'limit'),

    // All parameters needs to be implements
    
    createUserSchema: Joi.object({
        name: Joi.string().regex(/^[a-zA-Z\s]*$/).required(),
        lastname: Joi.string().regex(/^[a-zA-Z\s]*$/).required(),
        mail: Joi.string().email().required(),
        password: Joi.string().alphanum().min(5).required(),
        account: Joi.string().regex(/^\d{14,14}$/).required(),
        admin: Joi.boolean().required()
    }),

// Update Scehma for users *All can be updated except email
    updateUserSchema: Joi.object({
        name: Joi.string().regex(/^[a-zA-Z\s]*$/).optional(),
        lastname: Joi.string().regex(/^[a-zA-Z\s]*$/).optional(),
        password: Joi.string().alphanum().min(5).optional(),
        account: Joi.string().regex(/^\d{14,14}$/).optional(),
        admin: Joi.boolean().optional()
    })
};
