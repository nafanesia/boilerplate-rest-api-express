import Sequelize from 'sequelize';
import database from '../config/database';

const User = database.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  },
);

export default User;
