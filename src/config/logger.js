const winston = require('winston');
require('winston-daily-rotate-file');
const process = require('process');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'logs/info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '1mb',
        maxFiles: '14d'
    }),
    new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '1mb',
        maxFiles: '14d'
    })
  ]
});

var error = new Error('Bar');

logger.info('Testing with normal javascript object', {test: 'abc'});
logger.info('Testing with error object', error);

console.log(error);

module.exports = logger;
