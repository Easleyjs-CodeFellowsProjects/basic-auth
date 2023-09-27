'use strict';

const bcrypt = require('bcrypt');

const userModel = (sequelize, DataTypes) => {
  const userTable = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // hook: something that occurs automagically -> when an event.
  userTable.beforeCreate(async (user) => {
    // encrypt the password
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  userTable.authenticateBasic = async function (username, password) {
    let userRecord = await this.findOne({ where: { username }}); // valuse are pulled from DB
    let valid = await bcrypt.compare(password, userRecord.password);
    if (valid) {
      return userRecord;
    } else {
      throw new Error('Invalid credentials');
    }
  }
}

module.exports = userModel;
