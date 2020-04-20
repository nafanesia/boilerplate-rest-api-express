import { hash as _hash, compare } from 'bcryptjs';
import config from '../config';

const encrypt = (params) => new Promise((resolve, reject) => {
  _hash(params, config.saltRounds, (err, hash) => {
    if (!err) {
      resolve(hash);
    } else {
      reject(err);
    }
  });
});

const decrypt = (params, hash) => new Promise((resolve, reject) => {
  compare(params, hash, (err, success) => {
    if (!err) {
      resolve(success);
    } else {
      reject(err);
    }
  });
});

export default { encrypt, decrypt };
