const response = require("../utils/response");
const Example = require("../models/example");

// Find all example
const get = (req, res, next) => {
  const { firstName } = req.query;
  try {
    if (firstName) {
      Example.findOne({
        where: {
          firstName,
        },
      }).then((name) => {
        if (!name) {
          return response.badRequest(res, {
            message: `Name with firstname ${firstName} not found!`,
          });
        }
        return response.ok(res, { message: "Name found", data: name });
      });
    }

    Example.findAll().then((list) => {
      return response.ok(res, { message: "All list example", data: list });
    });
  } catch (err) {
    return response.internalServerError(res, {
      message: err.message,
      data: err,
    });
  }
};

// Create a new example name
const insert = (req, res, next) => {
  const { firstName, lastName } = req.body;
  try {
    // Create a new user
    Example.create({ firstName, lastName }).then((name) => {
      return response.created(res, {
        message: "Name inserted!",
        data: { firstName: name.firstName, lastName: name.lastName },
      });
    });
  } catch {
    return response.internalServerError(res, {
      message: err.message,
      data: err,
    });
  }
};

// Change everyone where firstname to name (firstname, lastname)
const update = (req, res, next) => {
  const { updateName, firstName } = req.body;
  try {
    Example.update(
      { firstName: updateName.firstName, lastName: updateName.lastName },
      { where: { firstName }, limit: 1 }
    ).then((listSuccess) => {
      if (listSuccess[0] == 0) {
        return response.badRequest(res, {
          message: `Name with firstName ${firstName} not found!`,
          data: { listSuccess },
        });
      }
      return response.ok(res, {
        message: `Name with firstName ${firstName} was updated`,
        data: { array },
      });
    });
  } catch (err) {
    return response.internalServerError(res, {
      message: err.message,
      data: err,
    });
  }
};

// Delete everyone named with firstname
const destroy = (req, res, next) => {
  const { firstName } = req.body;
  try {
    Example.destroy({
      where: {
        firstName,
      },
    }).then((countDestroy) => {
      if (countDestroy == 0) {
        return response.badRequest(res, {
          message: `Name with ${firstName} not found!`,
          data: { countDestroy },
        });
      }
      return response.ok(res, {
        message: `Name with ${firstName} was deleted`,
        data: { countDestroy },
      });
    });
  } catch (err) {
    return response.internalServerError(res, {
      message: err.message,
      data: err,
    });
  }
};

module.exports = { get, insert, update, destroy };
