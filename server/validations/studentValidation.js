const Joi = require('joi');

const studentCreateSchema = Joi.object({
    name: Joi.string().required().trim().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().trim().lowercase().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    age: Joi.number().integer().min(0).required().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Age cannot be negative',
        'any.required': 'Age is required'
    }),
    address: Joi.string().required().trim().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is required'
    })
});

const studentUpdateSchema = Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email().trim().lowercase(),
    age: Joi.number().integer().min(0),
    address: Joi.string().trim()
}).min(1); // At least one field must be provided for update

module.exports = {
    studentCreateSchema,
    studentUpdateSchema
};
