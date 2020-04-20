import response from '../utils/response';
import Example from '../models/example';

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
          response.badRequest(res, {
            message: `Name with firstname ${firstName} not found!`,
          });
        }
        response.ok(res, { message: 'Name found', data: name });
      });
    }

    Example.findAll().then((list) => {
      response.ok(res, { message: 'All list example', data: list });
    });
  } catch (err) {
    response.internalServerError(res, {
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
      response.created(res, {
        message: 'Name inserted!',
        data: { firstName: name.firstName, lastName: name.lastName },
      });
    });
  } catch (err) {
    response.internalServerError(res, {
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
      { where: { firstName }, limit: 1 },
    ).then((listSuccess) => {
      if (listSuccess[0] === 0) {
        response.badRequest(res, {
          message: `Name with firstName ${firstName} not found!`,
          data: { listSuccess },
        });
      }
      response.ok(res, {
        message: `Name with firstName ${firstName} was updated`,
        data: { listSuccess },
      });
    });
  } catch (err) {
    response.internalServerError(res, {
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
      if (countDestroy === 0) {
        response.badRequest(res, {
          message: `Name with ${firstName} not found!`,
          data: { countDestroy },
        });
      }
      response.ok(res, {
        message: `Name with ${firstName} was deleted`,
        data: { countDestroy },
      });
    });
  } catch (err) {
    response.internalServerError(res, {
      message: err.message,
      data: err,
    });
  }
};

export default {
  get, insert, update, destroy,
};
