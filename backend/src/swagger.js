const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Convoo API',
      version: '1.0.0',
      description: 'Documentação automática das APIs do Convoo',
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Caminhos dos arquivos com comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
