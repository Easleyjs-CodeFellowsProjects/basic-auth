'use strict';

const express = require('express');
const cors = require('cors');
const basicAuth = require('./auth/middleware/basic.js');
const errorHandler = require('./middleware/errorHandler.js')
const app = express(); // singleton -> there can only be one
const { handleSignup, handleSignin} = require('./auth/router.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;

app.post('/signup', basicAuth, handleSignup);
app.post('/signin', basicAuth, handleSignin);

app.use(errorHandler)

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Running on port:', port);
    });
  }
}