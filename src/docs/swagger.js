const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
        title: 'Node Express API',
        description: 'API for a simple blog',
        contact: {
            name: 'John Doe',
        },
        servers: ['http://localhost:3000'],
        },
    },
    apis: ['src/docs/*.yaml'],
    };

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;