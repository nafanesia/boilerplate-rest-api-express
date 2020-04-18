/**
 * Third party libraries
 */
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

/**
 * server configuration
 */
const config = require("./src/config");
const routes = require("./src/routes");
const dbService = require("./src/services/database.service");

// environment
const environment = config.environment;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const db = dbService({ drop: false });

// allow cross origin request
app.use(cors());

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

server.listen(config.port, () => {
  if (
    environment !== "development" &&
    environment !== "stagging" &&
    environment !== "production"
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only development, stagging and production are valid.`
    );
    process.exit(1);
  }
  console.log(`Server running in environment ${environment}!`);
  return db;
});
