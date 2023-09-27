'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./User');
const Collection = require('./collection');

const SQL_CONNECTION_STRING =
    process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';

const sequelize = new Sequelize(SQL_CONNECTION_STRING, { logging: false });
const UserModel = user(sequelize, DataTypes);

//Associations
/*
PetModel.belongsTo(PersonModel, { foreignKey: 'personId', targetKey: 'id' });
PersonModel.hasMany(PetModel, { foreignKey: 'personId', sourceKey: 'id' });
*/

module.exports = {
    sequelize,
    UserModel: new Collection(UserModel),
};
