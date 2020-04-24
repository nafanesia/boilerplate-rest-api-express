import validator from 'validator';
import { sendRaw, badRequest } from '../utils/response';
import authService from '../services/auth.service';

const login = (req, res) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    authService.login({ email, password }).then((rawData) => {
      sendRaw(res, rawData);
    });
  } else {
    badRequest(res, { message: 'Invalid email address format' });
  }
};

const register = (req, res) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    authService.register({ email, password }).then((rawData) => {
      sendRaw(res, rawData);
    });
  } else {
    badRequest(res, { message: 'Invalid email address format' });
  }
};

module.exports = { login, register };
