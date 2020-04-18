const Sequelize = require("sequelize");
const connection_database = require("../config/connection_database");

const con = connection_database();

const database = new Sequelize(con.database, con.username, con.password, {
  host: con.host,
  dialect: con.dialect,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = database;
