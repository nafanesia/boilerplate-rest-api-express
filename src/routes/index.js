const authRoute = require("./auth_route");

module.exports = (app) => {
  authRoute(app);
};
