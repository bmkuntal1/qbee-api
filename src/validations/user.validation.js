const e = require('express');
const Joi = require('joi');

const getAll = {
  query: Joi.object().keys({
    search: Joi.string().allow(null),
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10)
  })
};

const get = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
};

const create = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  })
};

const update = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    phoneNumber: Joi.string().max(30)
  })
};

const updatePassword = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    newPassword: Joi.string().required()
  })
};

const remove = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
};

const getProfile = {
  query: Joi.object().keys({
    id: Joi.number().required()
  })
};

const updateProfile = {
  body: Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).optional(),
    phoneNumber: Joi.string().max(30).optional()
  })
};

const changePassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
};

module.exports = {
  getAll,
  get,
  create,
  update,
  updatePassword,
  remove,
  updateProfile,
  getProfile,
  changePassword
};
