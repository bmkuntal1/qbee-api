const express = require('express')
const process = require('process')
const router = express.Router()
const validate = require('../middlewares/validate.middleware')
const schema = require('../validations/auth.validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userService = require('../services/user.service')
const auth = require('../middlewares/auth.middleware')
const ApiError = require('../utils/ApiError')
const { JWT_SECRET } = process.env

router.post('/register', validate(schema.register), async (req, res) => {
  try {
    var passwordHash = bcrypt.hashSync(req.body.password, 8)
    req.body.password = passwordHash
    const user = await userService.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/login', validate(schema.login), async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userService.findOneByEmail(email)
    if (!user) {
      throw new ApiError('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new ApiError('Invalid credentials')
    }
    const payload = {
      id: user.id,
      email: user.email
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: 3600
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      throw new ApiError('Refresh token is required')
    }
    const decoded = jwt.verify(refreshToken, JWT_SECRET)
    const payload = {
      id: decoded.id,
      email: decoded.email
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
    res.status(200).json({
      accessToken: accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 3600
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/user', auth, (req, res) => {
  const user = userService.findOne(req.user.id)
  res.status(200).json(user)
})

module.exports = router
