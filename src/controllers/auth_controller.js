import validator from 'validator';
import response from '../utils/response';
import authService from '../services/auth.service';

const login = async (req, res) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    const result = await authService.login({ email, password });
    response.send(res, result);
  } else {
    response.badRequest(res, { message: 'Invalid email address format' });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    const result = await authService.register({ email, password });
    response.send(res, result);
  } else {
    response.badRequest(res, { message: 'Invalid email address format' });
  }
};

module.exports = { login, register };
