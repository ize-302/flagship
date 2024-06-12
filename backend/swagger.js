import swaggerJsdoc from 'swagger-jsdoc';
import { PORT, BASE_PATH } from './config.js';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Flagship API doc',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}${BASE_PATH}`,
        description: "Development"
      },
    ]
  },
  apis: ['backend/routes/auth.routes.js', 'backend/routes/projects.routes.js', 'backend/routes/environments.routes.js', 'backend/routes/flags.routes.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs