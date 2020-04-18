const authRoute = require("./auth_route");
const exampleRoute = require("./example_route");

module.exports = (app) => {
  authRoute(app);
  exampleRoute(app);
};
