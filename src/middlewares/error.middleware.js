const ApiError = require('../utils/ApiError')

const errorHandler = (err, req, res, next) => {
  console.error('Error Handler::', err.stack)

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message
    })
  }

  res.status(500).json({
    message: err.message
  })
}

module.exports = errorHandler
