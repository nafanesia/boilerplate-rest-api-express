const validator = require("validator");
const response = require("../utils/response");
const User = require("../models/user");
const bcryptService = require("../services/bcrypt.service");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return response.badRequest(res, {
          message: `${email} not found!`,
        });
      }

      const success = await bcryptService.decrypt(password, user.password);
      if (success) {
        return response.ok(res, {
          message: "Login successfull",
          data: { token: "t0k3n" },
        });
      } else {
        return response.notFound(res, { message: "Invalid password" });
      }
    } catch (err) {
      return response.internalServerError(res, {
        message: err.message,
        data: err,
      });
    }
  } else {
    return response.badRequest(res, {
      message: "Invalid email address format",
    });
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    try {
      const hash = await bcryptService.encrypt(password);
      try {
        const user = await User.create({
          email: email,
          password: hash,
        });
        response.created(res, {
          message: "Register successfull",
          data: { user },
        });
      } catch (err) {
        response.conflict(res, {
          message: `${email} has registered!`,
          data: err,
        });
      }
    } catch (err) {
      response.internalServerError(res, {
        message: err.message,
        data: err,
      });
    }
  } else {
    response.badRequest(res, { message: "Invalid email address format" });
  }
};

module.exports = { login, register };
