const authController = require("../controllers/auth_controller");

module.exports = (app) => {
  app.route("/login").post(authController.login);
  app.route("/register").post(authController.register);
};
