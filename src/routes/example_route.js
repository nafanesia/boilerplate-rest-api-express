const exampleController = require("../controllers/example_controller");

module.exports = (app) => {
  app.route("/example").get(exampleController.get);
  app.route("/example").post(exampleController.insert);
  app.route("/example").put(exampleController.update);
  app.route("/example").delete(exampleController.destroy);
};
