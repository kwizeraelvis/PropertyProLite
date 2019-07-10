import winston from 'winston';
import 'express-async-errors';

export default () => {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'node_exceptions.log' }),
  );

  // process.on('unhandledRejection', (ex) => {
  //     throw ex;
  // });

  try {
    winston.add(winston.transports.File, { filename: 'express_exceptions.log' });
  } catch (ex) { }
};
