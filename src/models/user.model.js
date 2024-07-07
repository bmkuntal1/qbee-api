const sequelize = require("sequelize");
const db = require("../models");

const User = db.sequelize.define("users", {
  name: {
    type: sequelize.STRING,
    AllowNull: false,
  },
  email: {
    type: sequelize.STRING,
    AllowNull: false,
  },
  password: {
    type: sequelize.STRING,
    AllowNull: false,
  }
});

module.exports = User;
