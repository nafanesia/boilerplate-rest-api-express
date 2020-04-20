require('dotenv').config();

const config = {
  port: process.env.PORT,
  saltRounds: 10,
};

export default config;
