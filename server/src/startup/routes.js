import express from 'express';
import signup from '../routes/signup';
import error from '../middleware/error';

export default (app) => {
  app.use(express.json());
  app.use('/api/v1/auth/signup', signup);
  app.use(error);
};
