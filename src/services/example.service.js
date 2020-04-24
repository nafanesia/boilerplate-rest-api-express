import Example from '../models/example';
import response from '../utils/response';

const get = async ({ firstName }) => {
  try {
    if (firstName) {
      const name = await Example.findOne({
        where: {
          firstName,
        },
      });
      if (!name) {
        return response.result({
          status: response.statusCode.NOT_FOUND,
          message: `Name with firstname ${firstName} not found!`,
        });
      }
      return response.result({
        status: response.statusCode.OK,
        message: 'Name found',
        data: name,
      });
    }

    const list = await Example.findAll();
    let message = 'No item in list example';
    console.log(list.length);
    if (list.length > 0) {
      message = 'All list example';
    }
    return response.result({
      status: response.statusCode.OK,
      message,
      data: list,
    });
  } catch (err) {
    return response.result({
      status: response.statusCode.OK,
      message: err.message,
      data: err,
    });
  }
};

const insert = async ({ firstName, lastName }) => {
  try {
    // Create a new user
    const name = await Example.create({ firstName, lastName });
    return response.result({
      status: response.statusCode.CREATED,
      message: 'Name inserted!',
      data: { firstName: name.firstName, lastName: name.lastName },
    });
  } catch (err) {
    return response.result({
      status: response.statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    });
  }
};

const update = async ({ updateName, firstName }) => {
  try {
    const listSuccess = await Example.update(
      { firstName: updateName.firstName, lastName: updateName.lastName },
      { where: { firstName }, limit: 1 },
    );
    if (listSuccess[0] === 0) {
      return response.result({
        status: response.statusCode.NOT_FOUND,
        message: `Name with firstName ${firstName} not found!`,
        data: { listSuccess },
      });
    }

    return response.result({
      status: response.statusCode.OK,
      message: `Name with firstName ${firstName} was updated`,
      data: { listSuccess },
    });
  } catch (err) {
    return response.result({
      status: response.statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    });
  }
};

const destroy = async ({ firstName }) => {
  try {
    const countDestroy = await Example.destroy({
      where: {
        firstName,
      },
    });
    if (countDestroy === 0) {
      return response.result({
        status: response.statusCode.BAD_REQUEST,
        message: `Name with ${firstName} not found!`,
        data: { countDestroy },
      });
    }

    return response.result({
      status: response.statusCode.OK,
      message: `Name with ${firstName} was deleted`,
      data: { countDestroy },
    });
  } catch (err) {
    return response.result({
      status: response.statusCode.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: err,
    });
  }
};

export default {
  get,
  insert,
  update,
  destroy,
};
