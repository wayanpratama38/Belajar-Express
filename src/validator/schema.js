import Joi from 'joi';

// schema for validate /books payload
export const postNewBookValidator = Joi.object({
    title : Joi.string().required(),
    author : Joi.string().required(),
    year : Joi.number().required(),
})
