const Joi = require('@hapi/joi');

module.exports = {
    loginSchema: Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().alphanum().min(5).required()
    })
};