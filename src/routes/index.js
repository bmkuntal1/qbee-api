const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger');
const router = require('express').Router();
const authRouter = require('./auth.route');

//const userRouter = require('./user.route');


router.use('/auth', authRouter);
//router.use('/users', userRouter);

//swagger docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;