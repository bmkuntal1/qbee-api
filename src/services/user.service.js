const { logger } = require("sequelize/lib/utils/logger");
const User = require("../models/user.model.js");

const findAll = async () => {
  return await User.findAll();
};

const findOne = (id) => {
  return User.findByPk(id);
};

const findOneByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

const create = async (data) => {
  const emailTaken =await findOneByEmail(data.email);
  if (emailTaken) {
    throw new Error("Email is already taken");
  }
  return await User.create(data);
};

const update = async (data) => {
  return await User.update(data, {
    where: {
      id: data.id,
    },
  });
};

const remove = async (id) => {
  return await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  create,
  findAll,
  findOne,
  findOneByEmail,
  update,
  remove,
};
