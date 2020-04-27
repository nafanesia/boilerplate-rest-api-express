'use strict';
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define(
    'Example',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {},
  );
  Example.associate = function (models) {
    // associations can be defined here
  };
  return Example;
};
