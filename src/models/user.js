const Sequelize = require("sequelize");
const database = require("../utils/database");

const User = database.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

module.exports = User;
