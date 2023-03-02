const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: "O2 Media Documents",
      version: '1.0.0',
    },
  },
  apis: ["./router/*"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports.swaggerUI = swaggerUI.serve
module.exports.swaggerSetup = swaggerUI.setup(swaggerDocs)