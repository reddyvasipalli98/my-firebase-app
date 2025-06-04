const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Books application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./index.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
module.exports = specs; 