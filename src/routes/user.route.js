const express = require('express')
const httpStatus = require('http-status')
const userService = require('../services/user.service')
const validate = require('../middlewares/validate.middleware')
const schema = require('../validations/user.validation')

const router = express.Router()

router.get('/', validate(schema.getAll), async (req, res) => {
  const users = await userService.findAll(req.query)
  res.status(200).json(users)
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.findOne(req.params.id)
    if (!user) {
      throw new Error(httpStatus.NOT_FOUND, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/detail', async (req, res, next) => {
  try {
    const user = await userService.findOne(req.params.id)
    if (!user) {
      throw new Error(httpStatus.NOT_FOUND, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await userService.create(req.body)
    res.status(201).end()
  } catch (error) {
    next(error)
  }
})

router.put('/', validate(schema.update), async (req, res, next) => {
  try {
    await userService.update(req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await userService.remove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
