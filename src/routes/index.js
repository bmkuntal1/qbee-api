const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../docs/swagger');
const router = require('express').Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');

//const userRouter = require('./user.route');


router.use('/auth', authRouter);
router.use('/users', userRouter);

//if no route found redirect to swagger docs

router.get('/', (req, res) => {
    res.redirect('/api-docs');
});

//swagger docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;