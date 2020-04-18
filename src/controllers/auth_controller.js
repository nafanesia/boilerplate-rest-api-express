const validator = require("validator");
const response = require("../utils/response");
const User = require("../models/user");
const bcryptService = require("../services/bcrypt.service");

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
          return response.badRequest(res, {
            message: `${email} not found!`,
          });
        }
        bcryptService.decrypt(password, user.password).then((success) => {
          if (success) {
            return response.ok(res, {
              message: "Login successfull",
              data: { token: "t0k3n" },
            });
          } else {
            return response.notFound(res, { message: "Invalid password" });
          }
        });
      });
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

const register = (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmail(email)) {
    try {
      bcryptService.encrypt(password).then((hash) => {
        User.create({
          email: email,
          password: hash,
        })
          .then((user) => {
            return response.created(res, {
              message: "Register successfull",
              data: { user },
            });
          })
          .catch((err) => {
            return response.conflict(res, {
              message: `${email} has registered!`,
              data: err,
            });
          });
      });
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

module.exports = { login, register };
