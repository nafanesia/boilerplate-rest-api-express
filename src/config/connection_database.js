const config = require("./index");

const _development = {
  database: process.env.DB_NAME || "database",
  username: process.env.DB_USER || "username",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_CONNECTION || "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
};

const _stagging = {
  database: process.env.DB_NAME || "database",
  username: process.env.DB_USER || "username",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_CONNECTION || "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
};

const _production = {
  database: process.env.DB_NAME || "database",
  username: process.env.DB_USER || "username",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_CONNECTION || "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
};

const connection = () => {
  switch (config.environment) {
    case "development":
      return _development;
    case "stagging":
      return _stagging;
    case "production":
      return _production;
  }
};

module.exports = connection;
