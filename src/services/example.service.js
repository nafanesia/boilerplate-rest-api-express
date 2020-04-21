import Example from '../models/example';
import { statusCode, dataRaw } from '../utils/response';

const get = ({ firstName }) => new Promise((resolve) => {
  try {
    if (firstName) {
      Example.findOne({
        where: {
          firstName,
        },
      }).then((name) => {
        if (!name) {
          resolve(dataRaw({
            status: statusCode.NOT_FOUND,
            message: `Name with firstname ${firstName} not found!`,
          }));
        }
        resolve(dataRaw({
          status: statusCode.OK,
          message: 'Name found',
          data: name,
        }));
      });
    }

    Example.findAll().then((list) => {
      let message = 'No item in list example';
      console.log(list.length);
      if (list.length > 0) {
        message = 'All list example';
      }
      resolve(dataRaw({
        status: statusCode.OK,
        message,
        data: list,
      }));
    });
  } catch (err) {
    resolve(dataRaw({
      status: statusCode.OK,
      message: err.message,
      data: err,
    }));
  }
});

const insert = ({ firstName, lastName }) => new Promise((resolve) => {
  try {
    // Create a new user
    Example.create({ firstName, lastName }).then((name) => {
      resolve(dataRaw({
        status: statusCode.CREATED,
        message: 'Name inserted!',
        data: { firstName: name.firstName, lastName: name.lastName },
      }));
    });
  } catch (err) {
    resolve(dataRaw({
      status: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    }));
  }
});

const update = ({ updateName, firstName }) => new Promise((resolve) => {
  try {
    Example.update(
      { firstName: updateName.firstName, lastName: updateName.lastName },
      { where: { firstName }, limit: 1 },
    ).then((listSuccess) => {
      if (listSuccess[0] === 0) {
        resolve(dataRaw({
          status: statusCode.NOT_FOUND,
          message: `Name with firstName ${firstName} not found!`,
          data: { listSuccess },
        }));
      }
      resolve(dataRaw({
        status: statusCode.OK,
        message: `Name with firstName ${firstName} was updated`,
        data: { listSuccess },
      }));
    });
  } catch (err) {
    resolve(dataRaw({
      status: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    }));
  }
});

const destroy = ({ firstName }) => new Promise((resolve) => {
  try {
    Example.destroy({
      where: {
        firstName,
      },
    }).then((countDestroy) => {
      if (countDestroy === 0) {
        resolve(dataRaw({
          status: statusCode.BAD_REQUEST,
          message: `Name with ${firstName} not found!`,
          data: { countDestroy },
        }));
      }
      resolve(dataRaw({
        status: statusCode.OK,
        message: `Name with ${firstName} was deleted`,
        data: { countDestroy },
      }));
    });
  } catch (err) {
    resolve(dataRaw({
      status: statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    }));
  }
});

export default {
  get,
  insert,
  update,
  destroy,
};
