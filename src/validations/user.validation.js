const Joi = require('joi')

const getAll = {
  query: Joi.object().keys({
    search: Joi.string().allow(null),
    page: Joi.number().min(1).default(1),
    pageSize: Joi.number().min(1).max(100).default(10)
  })
}

const get = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
}

const create = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  })
}

const update = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    phoneNumber: Joi.string().max(30)
  })
}

const remove = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
}
