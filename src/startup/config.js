import config from 'config';
// import configFile from '../../config/test';

export default () => {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('jwtPrivateKey is not defined');
  }
};
