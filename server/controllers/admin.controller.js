const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
var transport = require('./../config/mail');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


module.exports.adminlogin = (req, res ) => {
    passport.authenticate('admin-local', (err, user, info) => {       
        if (err) 
       return res.status(400).json(err);
       // registered user
       else if (user)
      return res.status(200).json({ "token": user.generateJwt() });
       // unknown user or wrong password
       else 
       return res.status(404).json(info);
   })(req, res);
  }