import User from '../models/user';
import bcryptService from '../utils/bcrypt';
import response from '../utils/response';
import jwtService from './jwt.service';

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return response.result({
        status: response.statusCode.NOT_FOUND,
        message: `${email} not found!`,
      });
    }

    const success = await bcryptService.decrypt(password, user.password);
    if (success) {
      const token = jwtService.generateToken(email);
      return response.result({
        status: response.statusCode.OK,
        message: 'Login successfull',
        data: { token },
      });
    }
    return response.result({
      status: response.statusCode.BAD_REQUEST,
      message: 'Invalid password',
    });
  } catch (err) {
    return response.result({
      status: response.statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    });
  }
};

const register = async ({ email, password }) => {
  try {
    const hash = await bcryptService.encrypt(password);
    try {
      const user = await User.create({
        email,
        password: hash,
      });
      return response.result({
        status: response.statusCode.CREATED,
        message: 'Register successfull',
        data: { user },
      });
    } catch (err) {
      return response.result({
        status: response.statusCode.CONFLICT,
        message: `${email} has registered!`,
        data: err,
      });
    }
  } catch (err) {
    return response.result({
      status: response.statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    });
  }
};

export default {
  login,
  register,
};
