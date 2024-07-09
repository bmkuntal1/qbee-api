const httpStatus = require('http-status')
const { Op, Sequelize } = require('sequelize')
const User = require('../models/user.model.js')
const ApiError = require('../utils/ApiError.js')
const uploadFile = require('../utils/uploadFile.js')

const findAll = async ({ search, page, pageSize }) => {
  //like name or email
  const { rows: data, count: total } = await User.findAndCountAll({
    where: search
      ? {
          [Op.or]: [
            { firstName: { [Op.like]: `%${search}%` } },
            { lastName: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        }
      : {},
    attributes: [
      'id',
      'email',
      'firstName',
      'lastName',
      'role',
      'avatar',
      'createdAt',
      'updatedAt',
      [
        Sequelize.literal(
          `CASE WHEN "is_active" THEN 'active' ELSE 'inactive' END`
        ),
        'status'
      ]
    ],
    order: [['createdAt', 'DESC']],
    //isActive to active or inactive

    total: User.count(),
    limit: pageSize,
    offset: (page - 1) * pageSize
  })

  const totalPages = Math.ceil(total / pageSize)

  return { data, page, pageSize, total, totalPages }
}

const findOne = (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['password'] }
  })
}

const findOneByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  })
}

const create = async (data) => {
  const emailTaken = await findOneByEmail(data.email)
  if (emailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken')
  }
  await User.create(data)
}

const update = async (data) => {
  const user = await findOne(data.id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  await User.update(data, {
    where: {
      id: data.id
    }
  });
};

const remove = async (id) => {
  const user = await findOne(id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  return await User.destroy({
    where: {
      id: id
    }
  })
}

const getProfile = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  })
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

module.exports = {
  create,
  findAll,
  findOne,
  findOneByEmail,
  update,
  remove,
  getProfile
}
