import express from 'express';
import fileupload from 'express-fileupload';
import signup from '../routes/signup';
import signin from '../routes/signin';
import property from '../routes/property';
import error from '../middleware/user/error';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileupload({ useTempFiles: true }));
  app.use('/api/v1/auth/signup', signup);
  app.use('/api/v1/auth/signin', signin);
  app.use('/api/v1/property', property);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(error);
};
