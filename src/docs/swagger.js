const swaggerJSDoc = require('swagger-jsdoc')

const swaggerOptions = {
  openapi: '3.1.0',
  swaggerDefinition: {
    info: {
      title: 'QBee API',
      description: 'API for Qbee Platform',
      version: '1.0.0',
      // contact: {
      //     name: 'Naks Tech',
      //     url: 'https://nakstech.com',
      //     email: 'connect@nakstech.com',
      // },
      servers: ['http://localhost:8080']
    },
    host: 'localhost:8080',
    basePath: '/api',
  },
  apis: ['src/docs/*.yaml']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

module.exports = swaggerDocs
