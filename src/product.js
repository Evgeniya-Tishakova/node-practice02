import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should have at most 20 characters',
    'any.required': 'Username is required',
  }),
  price: Joi.number().required(),
  category: Joi.string()
    .valid('books', 'electronics', 'clothing', 'other')
    .required(),
  description: Joi.string(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20),
  price: Joi.number(),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
});
