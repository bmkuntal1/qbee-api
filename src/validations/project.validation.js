const Joi = require('joi')
const custom = require('./custom.validation')

const create = {
  body: Joi.object().keys({
    workPackageId: Joi.string().allow(null),
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    startDate: Joi.date().allow(null),
    endDate: Joi.date().allow(null),
    status: Joi.string().required(),
    deliveryManagerId: Joi.number().required(),
    projectManagerId: Joi.string().required(),
    teamMemberIds: Joi.string().allow(null)
  })
}

const update = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    workPackageId: Joi.string().allow(null),
    name: Joi.string().required(),
    description: Joi.string().allow(null),
    startDate: Joi.date().allow(null),
    endDate: Joi.date().allow(null),
    status: Joi.string().required(),
    deliveryManagerId: Joi.number().required(),
    projectManagerId: Joi.string().required(),
    teamMemberIds: Joi.string().allow(null)
  })
}

module.exports = {
    create,
    update
}
