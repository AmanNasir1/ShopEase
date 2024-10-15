const Joi = require("joi");

const signupValidationSchemma = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string(),
});
const loginValidationSchemma = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { loginValidationSchemma, signupValidationSchemma };
