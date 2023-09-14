const Joi = require('joi')

const createValidation = Joi.object({
    title: Joi.string().required().min(3),
    color: Joi.string().required().min(6)
})

const updateValidation = Joi.object({
    title: Joi.string().min(3),
    color: Joi.string().min(6)
})

const createTaskValidation = Joi.object({
    task: Joi.string().required().min(3),
    order: Joi.number().required()
})

const moveTaskValidation = Joi.object({
    session_id: Joi.string().required().min(8),
    order: Joi.number().required()
})

const updateTaskValidation = Joi.object({
    task: Joi.string().min(3),
    order: Joi.number()
})

module.exports = {
    createValidation,
    updateValidation,
    createTaskValidation,
    moveTaskValidation,
    updateTaskValidation
}
