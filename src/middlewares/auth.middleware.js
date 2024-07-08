const jwt = require('jsonwebtoken')
const process = require('process')
const { JWT_SECRET } = process.env
const logger = require('../config/logger')
const ApiError = require('../utils/ApiError')

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    logger.error(error)
    const err = new ApiError(401, 'Please authenticate')
    next(err)
  }
}

module.exports = auth
