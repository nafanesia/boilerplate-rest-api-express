const dotenv = require('dotenv');
dotenv.config();

console.log('port=' + process.env.PORT);
const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  saltRounds: 10,
};

module.exports = config;
