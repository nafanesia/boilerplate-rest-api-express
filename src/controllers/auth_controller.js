import validator from 'validator';
import response from '../utils/response';
import User from '../models/user';
import bcryptService from '../utils/bcrypt';

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    try {
      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          response.badRequest(res, {
            message: `${email} not found!`,
          });
        }
        bcryptService.decrypt(password, user.password).then((success) => {
          if (success) {
            response.ok(res, {
              message: 'Login successfull',
              data: { token: 't0k3n' },
            });
          }
          response.notFound(res, { message: 'Invalid password' });
        });
      });
    } catch (err) {
      response.internalServerError(res, {
        message: err.message,
        data: err,
      });
    }
  } else {
    response.badRequest(res, {
      message: 'Invalid email address format',
    });
  }
};

const register = (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    try {
      bcryptService.encrypt(password).then((hash) => {
        User.create({
          email,
          password: hash,
        })
          .then((user) => response.created(res, {
            message: 'Register successfull',
            data: { user },
          }))
          .catch((err) => response.conflict(res, {
            message: `${email} has registered!`,
            data: err,
          }));
      });
    } catch (err) {
      response.internalServerError(res, {
        message: err.message,
        data: err,
      });
    }
  } else {
    response.badRequest(res, {
      message: 'Invalid email address format',
    });
  }
};

module.exports = { login, register };
