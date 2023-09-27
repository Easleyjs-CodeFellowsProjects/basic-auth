'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UserModel } = require('../../models');

const router = express.Router();

router.get('/signin', handleSignin);
router.post('/signup', handleSignup);

//route to handle sign-ins
async function handleSignin(req, res, next) {
    try {
        // step1 - look at authorization header
        let encodedCredentials = req.headers.authorization;
        let encodedbase64 = encodedCredentials.split(' ')[1];
        let decoded = base64.decode(encodedbase64); // username:password
        let [ username, password ] = decoded.split(':'); // [username, password];
    
        //step2 - look for user based on username
        let userRecord = await User.findOne({ where: { username }});
    
        // step3 - compare passwords
        let isValid = await bcrypt.compare(password, userRecord.password);
        if (isValid) {
          res.status(200).send('You made it!');
        } else {
          throw new Error('Invalid credentials');
        }
    
      } catch (e) {
        console.log('Basic auth error:', e);
        next('Unauthenticated');
      }    
};

// route for registering a new user.
async function handleSignup(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
  
    let encryptedPassword = await bcrypt.hash(password, 10);
  
    let user = await UserModel.create({
      username,
      password: encryptedPassword
    });
    console.log('NEWLY CREATED USER!!', user);
  
    res.status(201).send(user);
};

module.exports = router;