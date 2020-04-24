import User from '../models/user';
import bcryptService from '../utils/bcrypt';
import { dataRaw, statusCode } from '../utils/response';

const login = ({ email, password }) =>
  new Promise((resolve) => {
    try {
      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          resolve(
            dataRaw({
              status: statusCode.NOT_FOUND,
              message: `${email} not found!`,
            }),
          );
        }
        bcryptService.decrypt(password, user.password).then((success) => {
          if (success) {
            resolve(
              dataRaw({
                status: statusCode.OK,
                message: 'Login successfull',
                data: { token: 't0k3n' },
              }),
            );
          }
          resolve(
            dataRaw({
              status: statusCode.BAD_REQUEST,
              message: 'Invalid password',
            }),
          );
        });
      });
    } catch (err) {
      resolve(
        dataRaw({
          status: statusCode.INTERNAL_SERVER_ERROR,
          message: err.message,
          data: err,
        }),
      );
    }
  });

const register = ({ email, password }) =>
  new Promise((resolve) => {
    try {
      bcryptService.encrypt(password).then((hash) => {
        User.create({
          email,
          password: hash,
        })
          .then((user) => {
            resolve(
              dataRaw({
                status: statusCode.CREATED,
                message: 'Register successfull',
                data: { user },
              }),
            );
          })
          .catch((err) => {
            resolve(
              dataRaw({
                status: statusCode.CONFLICT,
                message: `${email} has registered!`,
                data: err,
              }),
            );
          });
      });
    } catch (err) {
      resolve(
        dataRaw({
          status: statusCode.INTERNAL_SERVER_ERROR,
          message: err.message,
          data: err,
        }),
      );
    }
  });

export default {
  login,
  register,
};
