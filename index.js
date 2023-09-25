'use strict';

require('dotenv').config();
const { sequelize } = require('./src/models');
const server = require('./src/server');
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    server.start(PORT);
});