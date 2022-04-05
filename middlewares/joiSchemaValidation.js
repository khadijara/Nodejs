const Joi = require('@hapi/joi');

// Middleware de comprobación del creador
// Here creating middleware to validate the objects for the Users and Rooms

module.exports.validate = (schema, validation) => {
    return (req, res, next) => {
        let objToValidate = {};
        if (validation === 'body') objToValidate = req.body;
        else if (validation === 'query') objToValidate = req.query;
        else if (validation === 'path') objToValidate = req.params;

        const result = schema.validate(objToValidate);

        if (result.error) {
            const errorDetails = result.error.details.map((value) => {
                return value.message;
            });
            const responseObj = {
                status: 400,
                body: errorDetails
            }
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    };
};