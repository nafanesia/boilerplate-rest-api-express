const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const response = ({ success = false, message, data = {} }) => ({
  success,
  message,
  data,
});

const dataRaw = ({ status, message, data = {} }) => ({
  status, message, data,
});

const sendRaw = (res, { status, message, data = {} }) => {
  let success = false;
  if (status === statusCode.OK || status === statusCode.CREATED) {
    success = true;
  }
  res.status(status).send(response({ success, message, data }));
};

/**
 * The request was successfully completed.
 * @param {res} res
 * @param {*} {message, data}
 */
const ok = (res, { message, data }) => {
  res.status(statusCode.OK).send(response({ success: true, message, data }));
};

/**
 * A new resource was successfully created.
 * @param {res} res
 * @param {*} {message, data}
 */
const created = (res, { message, data }) => {
  res.status(statusCode.CREATED).send(response({ success: true, message, data }));
};

/**
 * The request was invalid.
 * @param {res} res
 * @param {*} {message, data}
 */
const badRequest = (res, { message, data }) => {
  res.status(statusCode.BAD_REQUEST).send(response({ message, data }));
};

/**
 * The request did not include an authentication token or the authentication token was expired.
 * @param {res} res
 * @param {*} {message, data}
 */
const unauthorized = (res, { message, data }) => {
  res.status(statusCode.UNAUTHORIZED).send(response({ message, data }));
};

/**
 * The client did not have permission to access the requested resource.
 * @param {res} res
 * @param {*} {message, data}
 */
const forbidden = (res, { message, data }) => {
  res.status(statusCode.FORBIDDEN).send(response({ message, data }));
};

/**
 * The requested resource was not found.
 * @param {res} res
 * @param {*} {message, data}
 */
const notFound = (res, { message, data }) => {
  res.status(statusCode.NOT_FOUND).send(response({ message, data }));
};

/**
 * The HTTP method in the request was not supported by the resource.
 * For example, the DELETE method cannot be used with the Agent API.
 * @param {res} res
 * @param {*} {message, data}
 */
const methodNotAllowed = (res, { message, data }) => {
  res.status(statusCode.METHOD_NOT_ALLOWED).send(response({ message, data }));
};

/**
 * The request could not be completed due to a conflict.
 * For example,  POST ContentStore Folder API cannot complete
 * if the given file or folder name already exists in the parent location.
 * @param {res} res
 * @param {*} {message, data}
 */
const conflict = (res, { message, data }) => {
  res.status(statusCode.CONFLICT).send(response({ message, data }));
};

/**
 * The request was not completed due to an internal error on the server side.
 * @param {res} res
 * @param {*} {message, data}
 */
const internalServerError = (res, { message, data }) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).send(response({ message, data }));
};

/**
 * The server was unavailable.
 * @param {res} res
 * @param {*} {message, data}
 */
const serviceUnavailable = (res, { message, data }) => {
  res.status(statusCode.SERVICE_UNAVAILABLE).send(response({ message, data }));
};

export {
  statusCode,
  dataRaw,
  sendRaw,
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
