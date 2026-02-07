const Joi = require('joi');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(new AppError(message, 400));
    }
    next();
};

const schemas = {
    register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    createPost: Joi.object({
        title: Joi.string().max(100).required(),
        content: Joi.string().required(),
        status: Joi.string().valid('draft', 'published'),
        tags: Joi.array().items(Joi.string())
    }),
    updatePost: Joi.object({
        title: Joi.string().max(100),
        content: Joi.string(),
        status: Joi.string().valid('draft', 'published'),
        tags: Joi.array().items(Joi.string())
    })
};

module.exports = {
    validate,
    schemas
};
