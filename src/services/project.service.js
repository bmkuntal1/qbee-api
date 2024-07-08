const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError.js')
const Project = require('../models/project.model.js')

const findAll = async () => {
  return await Project.findAll()
}

const findOne = (id) => {
  return Project.findByPk(id)
}

const create = async (data) => {
  return await Project.create(data)
}

const update = async (data) => {
  const project = await findOne(data.id)
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found')
  }
  return await Project.update(data, {
    where: {
      id: data.id
    }
  })
}

const remove = async (id) => {
  const project = await findOne(id)
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found')
  }
  return await Project.destroy({
    where: {
      id: id
    }
  })
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
}
