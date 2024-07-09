const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const usersRouter = require('./users.route');
const projectRouter = require('./project.route');
const systemRouter = require('./system.route');

const router = require('express').Router();

const apiRoutes = [
  {
    path: 'auth',
    router: authRouter
  },
  {
    path: 'user',
    router: userRouter
  },
  {
    path: 'users',
    router: usersRouter
  },
  {
    path: 'projects',
    router: projectRouter
  },
  {
    path: '',
    router: systemRouter
  }
];

//api routes
apiRoutes.forEach((route) => {
  router.use(`/api/${route.path}`, route.router);
});

//if no route found redirect to swagger docs
router.get('/', (req, res) => {
  res.redirect('/api-docs');
});

//swagger docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
