'use strict';
//const { Sequelize, DataTypes } = require('sequelize');
const UserModel = (sequelize, DataTypes) => {
    // create the user Model / Table
    sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
  });
}

module.exports = UserModel;