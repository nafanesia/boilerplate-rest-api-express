import authRoute from './auth_route';
import exampleRoute from './example_route';

const routes = (app) => {
  authRoute(app);
  exampleRoute(app);
};

export default routes;
