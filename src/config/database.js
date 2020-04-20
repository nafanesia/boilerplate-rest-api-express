import Sequelize from 'sequelize';

require('dotenv').config();

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);

export default database;
