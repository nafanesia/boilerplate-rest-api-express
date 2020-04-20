import exampleController from '../controllers/example_controller';

const exampleRoute = (app) => {
  app.route('/example').get(exampleController.get);
  app.route('/example').post(exampleController.insert);
  app.route('/example').put(exampleController.update);
  app.route('/example').delete(exampleController.destroy);
};

export default exampleRoute;
