const winston = require('winston');
const process = require('process');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ 
            filename: 'logs/api-error.log', 
            level: 'error'
        }),
        new winston.transports.File({ 
            filename: 'logs/api-info.log', 
            level: 'info'
        }),
    ]
});

module.exports = logger;