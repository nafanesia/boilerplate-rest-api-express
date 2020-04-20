const response = ({ success = false, message, data = {} }) => ({
  success,
  message,
  data,
});

/**
 * The request was successfully completed.
 * @param {res} res
 * @param {*} {message, data}
 */
const ok = (res, { message, data }) => {
  res.status(200).send(response({ success: true, message, data }));
};

/**
 * A new resource was successfully created.
 * @param {res} res
 * @param {*} {message, data}
 */
const created = (res, { message, data }) => {
  res.status(201).send(response({ success: true, message, data }));
};

/**
 * The request was invalid.
 * @param {res} res
 * @param {*} {message, data}
 */
const badRequest = (res, { message, data }) => {
  res.status(400).send(response({ message, data }));
};

/**
 * The request did not include an authentication token or the authentication token was expired.
 * @param {res} res
 * @param {*} {message, data}
 */
const unauthorized = (res, { message, data }) => {
  res.status(401).send(response({ message, data }));
};

/**
 * The client did not have permission to access the requested resource.
 * @param {res} res
 * @param {*} {message, data}
 */
const forbidden = (res, { message, data }) => {
  res.status(403).send(response({ message, data }));
};

/**
 * The requested resource was not found.
 * @param {res} res
 * @param {*} {message, data}
 */
const notFound = (res, { message, data }) => {
  res.status(404).send(response({ message, data }));
};

/**
 * The HTTP method in the request was not supported by the resource.
 * For example, the DELETE method cannot be used with the Agent API.
 * @param {res} res
 * @param {*} {message, data}
 */
const methodNotAllowed = (res, { message, data }) => {
  res.status(405).send(response({ message, data }));
};

/**
 * The request could not be completed due to a conflict.
 * For example,  POST ContentStore Folder API cannot complete
 * if the given file or folder name already exists in the parent location.
 * @param {res} res
 * @param {*} {message, data}
 */
const conflict = (res, { message, data }) => {
  res.status(409).send(response({ message, data }));
};

/**
 * The request was not completed due to an internal error on the server side.
 * @param {res} res
 * @param {*} {message, data}
 */
const internalServerError = (res, { message, data }) => {
  res.status(500).send(response({ message, data }));
};

/**
 * The server was unavailable.
 * @param {res} res
 * @param {*} {message, data}
 */
const serviceUnavailable = (res, { message, data }) => {
  res.status(503).send(response({ message, data }));
};

export default {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  conflict,
  internalServerError,
  serviceUnavailable,
};
