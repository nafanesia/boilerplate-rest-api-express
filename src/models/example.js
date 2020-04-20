import Sequelize from 'sequelize';
import database from '../config/database';

const Example = database.define(
  'example',
  {
    firstName: {
      type: Sequelize.STRING,
      // unique: true,
      // allowNull : false,
    },
    lastName: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
  },
  {
    // options
  },
);

export default Example;
