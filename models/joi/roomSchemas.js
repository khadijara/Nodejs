const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    roomIdScehma: Joi.object({
        id: Joi.objectId().required()
    }),

    getroomSechma: Joi.object({   // get all room schema
        skip: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional()
    }).and('skip', 'limit'),

    createRoomSchema: Joi.object({
        id: Joi.number().optional(),
        bednumber: Joi.number().integer().min(0).max(1000).required(),
        price: Joi.number().min(0).required(),
        created: Joi.date().required()
    }),

    updateRoomSchema: Joi.object({
        id: Joi.number().optional(),
        bednumber: Joi.number().integer().min(0).max(1000).optional(),
        price: Joi.number().min(0).optional(),
        created: Joi.date().optional()
    }),
};
