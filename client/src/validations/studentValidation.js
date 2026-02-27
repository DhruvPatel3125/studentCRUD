import Joi from 'joi';

export const studentCreateSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    age: Joi.number().integer().min(0).required().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Age cannot be negative',
        'any.required': 'Age is required'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Address is required',
        'any.required': 'Address is required'
    })
});

export const studentUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }),
    age: Joi.number().integer().min(0),
    address: Joi.string()
}).min(1);
