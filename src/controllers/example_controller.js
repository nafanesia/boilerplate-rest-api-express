import { sendRaw } from '../utils/response';
import exampleService from '../services/example.service';

// Find all or one example
const get = (req, res) => {
  const { firstName } = req.query;
  exampleService.get({ firstName }).then((rawData) => {
    sendRaw(res, rawData);
  });
};

// Create a new example name
const insert = (req, res) => {
  const { firstName, lastName } = req.body;
  exampleService.insert({ firstName, lastName }).then((rawData) => {
    sendRaw(res, rawData);
  });
};

// Change everyone where firstname to name (firstname, lastname)
const update = (req, res) => {
  const { updateName, firstName } = req.body;
  exampleService.update({ updateName, firstName }).then((rawData) => {
    sendRaw(res, rawData);
  });
};

// Delete everyone named with firstname
const destroy = (req, res) => {
  const { firstName } = req.body;
  exampleService.destroy({ firstName }).then((rawData) => {
    sendRaw(res, rawData);
  });
};

export default {
  get,
  insert,
  update,
  destroy,
};
