import authController from '../controllers/auth_controller';

const authRoute = (app) => {
  app.route('/login').post(authController.login);
  app.route('/register').post(authController.register);
};

export default authRoute;
