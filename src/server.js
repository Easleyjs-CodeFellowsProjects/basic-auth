'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// instantiate our server and our DB connection
const PORT = process.env.PORT || 3001;

const app = express();
const userRouter = require('./middleware/routes/user');

//  setup the server
app.use(cors());
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true })) ;// form data

app.use('/', userRouter);

module.exports = {
  app,
  start: (port) => {
    app.listen(PORT, () => {
      console.log('App Started!');
    })
  }
};