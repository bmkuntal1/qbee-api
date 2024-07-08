const sequelize = require('sequelize')
const db = require('../models')

const Projects = db.sequelize.define('projects', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  workPackageId: {
    type: sequelize.STRING,
    AllowNull: true
  },
  name: {
    type: sequelize.STRING,
    AllowNull: false
  },
  description: {
    type: sequelize.STRING,
  },
  startDate: {
    type: sequelize.DATE,
  },
  endDate: {
    type: sequelize.DATE,
  },
  status: {
    type: sequelize.STRING,
  },
  deliveryManagerId: {
    type: sequelize.INTEGER,
  },
  projectManagerId: {
    type: sequelize.INTEGER,
  }
})

module.exports = Projects
