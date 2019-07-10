import express from 'express';
import logging from './startup/logging';
import config from './startup/config';
import routes from './startup/routes';


const app = express();
logging();
config();
routes(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;

// TO DO: uncomment logging unhandled rejection
