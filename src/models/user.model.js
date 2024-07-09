const sequelize = require("sequelize");
const db = require("../models");

const User = db.sequelize.define("users", {
  firstName: {
    type: sequelize.STRING,
    AllowNull: false,
  },
  lastName: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
    AllowNull: false,
  },
  phoneNumber: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
    AllowNull: false,
  },
  role: {
    type: sequelize.STRING,
  },
  avatar: {
    type: sequelize.STRING,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
