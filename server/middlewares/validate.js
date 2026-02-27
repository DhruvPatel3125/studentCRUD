const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Include all errors, not just the first one
            stripUnknown: true // Remove fields not defined in the schema
        });

        if (error) {
            const errorMessages = {};
            error.details.forEach((detail) => {
                errorMessages[detail.path[0]] = detail.message;
            });
            return res.status(400).json({
                message: 'Validation failed',
                errors: errorMessages
            });
        }

        // Replace req.body with validated and stripped value
        req.body = value;
        next();
    };
};

module.exports = validate;
