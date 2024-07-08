//main express app file
const express = require('express');
const morgan = require('morgan');
const process = require('process');
const cors = require('cors');
const logger = require('./config/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const app = express();

const APP_HOST = process.env.APP_HOST || 'localhost';
const APP_PORT = process.env.APP_PORT || 3000;

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

//cors
const corsOption = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
};
app.use(cors(corsOption));

//logging
const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms'
app.use(morgan(morganFormat, { stream: logger.stream.write }));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes;
app.use(router);

//error handler
app.use(errorHandler);

//export the app
app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} is running at http://${app.get('host')}:${app.get('port')}`
  )
});


module.exports = app
