// register and login validation
const req = require("express/lib/request");
const Joi = require("joi");
const custom = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: custom.password,
    name: Joi.string().required().max(128),
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
