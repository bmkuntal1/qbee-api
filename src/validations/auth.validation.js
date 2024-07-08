const Joi = require("joi");
const custom = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().max(50),
    lastName: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    password: custom.password,
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: custom.password,
  }),
};

module.exports = {
  register,
  login,
};
