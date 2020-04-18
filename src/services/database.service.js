const database = require("../utils/database");

const logSuccess = () => {
  console.info("Connection has been established successfully.");
};

const logFailure = (err) => {
  console.error("Unable to connect to the database:", err);
};

const dbService = async ({ drop }) => {
  try {
    await database.authenticate();
    if (drop) {
      await database.drop();
    }
    await database.sync();
    logSuccess();
  } catch (err) {
    logFailure(err);
  }
};

module.exports = dbService;
