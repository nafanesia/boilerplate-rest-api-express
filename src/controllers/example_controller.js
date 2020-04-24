import response from '../utils/response';
import exampleService from '../services/example.service';

// Find all or one example
const get = async (req, res) => {
  const { firstName } = req.query;
  const result = await exampleService.get({ firstName });
  response.send(res, result);
};

// Create a new example name
const insert = async (req, res) => {
  const { firstName, lastName } = req.body;
  const result = await exampleService.insert({ firstName, lastName });
  response.send(res, result);
};

// Change everyone where firstname to name (firstname, lastname)
const update = async (req, res) => {
  const { updateName, firstName } = req.body;
  const result = await exampleService.update({ updateName, firstName });
  response.send(res, result);
};

// Delete everyone named with firstname
const destroy = async (req, res) => {
  const { firstName } = req.body;
  const result = await exampleService.destroy({ firstName });
  response.send(res, result);
};

export default {
  get,
  insert,
  update,
  destroy,
};
