import jwt from 'jsonwebtoken';

const generateToken = (email) => jwt.sign(email, process.env.JWT_SECRET);
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });

export default { generateToken, verifyToken };
