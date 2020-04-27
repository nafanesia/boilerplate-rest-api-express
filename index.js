/**
 * Third party libraries
 */
import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import helmet from 'helmet';

/**
 * Server configuration
 */
import config from './src/config';
import routes from './src/routes';

/**
 * express application
 */
const app = express();
const server = Server(app);

// allow cross origin request
app.use(cors());

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  }),
);

// parsing the request bodys
app.use(urlencoded({ extended: false }));
app.use(json());

routes(app);

server.listen(config.port, () => {
  console.log(`Server running in PORT ${config.port}!`);
});
