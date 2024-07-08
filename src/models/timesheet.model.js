const sequelize = require('sequelize')
const db = require('../models')

const User = db.sequelize.define('timesheet', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  workPackageId: {
    type: sequelize.STRING,
    AllowNull: false
  },
  userId: {
    type: sequelize.STRING,
    AllowNull: false
  },
  date: {
    type: sequelize.DATE,
    AllowNull: false
  },
  hours: {
    type: sequelize.FLOAT,
    AllowNull: false
  },
  description: {
    type: sequelize.STRING,
    AllowNull: true
  }
})

module.exports = User
