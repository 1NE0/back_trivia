const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
  title: "API McQuizz",
  version: '1,0.0',
  description: "Api para McQuizz",
},
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/*.js'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;