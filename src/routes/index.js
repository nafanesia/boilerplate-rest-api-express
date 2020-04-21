import authRoute from './auth_route';
import exampleRoute from './example_route';

const routes = (app) => {
  app.use(authRoute);
  app.use(exampleRoute);
};

export default routes;
