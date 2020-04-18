const Sequelize = require("sequelize");
const database = require("../utils/database");

const Example = database.define(
  "example",
  {
    firstName: {
      type: Sequelize.STRING,
      // unique: true,
      // allowNull : false,
    },
    lastName: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
  },
  {
    // options
  }
);

module.exports = Example;
