const bcrypt = require("bcryptjs");
const config = require("../config");

const encrypt = (params) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(params, config.saltRounds, (err, hash) => {
      if (!err) {
        resolve(hash);
      } else {
        reject(err);
      }
    });
  });
};

const decrypt = (params, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(params, hash, (err, success) => {
      if (!err) {
        resolve(success);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = { encrypt, decrypt };
