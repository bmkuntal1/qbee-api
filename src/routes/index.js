const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../docs/swagger')
const router = require('express').Router()
const authRouter = require('./auth.route')
const userRouter = require('./user.route')
const projectRouter = require('./project.route')

//const userRouter = require('./user.route');

const apiRoutes = [
  {
    path: 'auth',
    router: authRouter
  },
  {
    path: 'users',
    router: userRouter
  },
  {
    path: 'projects',
    router: projectRouter
  }
]

//api routes
apiRoutes.forEach((route) => {
  router.use(`/api/${route.path}`, route.router)
});

//if no route found redirect to swagger docs

router.get('/', (req, res) => {
  res.redirect('/api-docs')
})

//swagger docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

module.exports = router
