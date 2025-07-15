import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().min(3).required(),
  datetime: Joi.date().iso().required(),
  location: Joi.string().required(),
  capacity: Joi.number().integer().min(1).max(1000).required()
});

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required()
});

export const registerSchema = Joi.object({
  userId: Joi.number().integer().required()
});
