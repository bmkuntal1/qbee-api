const express = require('express')
const httpStatus = require('http-status')
const projectService = require('../services/project.service')

const router = express.Router()

router.get('/', async (req, res) => {
  const projects = await projectService.findAll()
  res.status(200).json(projects)
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await projectService.findOne(req.params.id)
    if (!project) {
      throw new Error(httpStatus.NOT_FOUND, 'Project not found')
    }
    res.status(200).json(project)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const project = await projectService.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await projectService.update(req.params.id, req.body)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await projectService.remove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
});

module.exports = router