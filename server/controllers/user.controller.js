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


module.exports.register = (req, res, next) => {
    var user = new User();
    user.userid = req.body.userid;
    user.mobileNo = req.body.mobileNo;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email/mobile no adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('user-local', (err, user, info) => {       
        // error from passport middleware
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




module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, data:user });
        }
    );
}


module.exports.getUsers =(req,res,next)=>{
  User.find({},function(err,users){  
      res.json(users);
  });
};



module.exports.updateProfile = (req, res, user, next)=>{
  var response = {};
  // first find out record exists or not
  // if it does then update the record
  User.findById( {_id: req._id } ,function(err,data){
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
      // we got data from Mongo.
      // change it accordingly.
          if(req.body.email !== undefined) {
              // case where email needs to be updated.
              data.email = req.body.email;
          }
          if(req.body.mobileNo !== undefined) {
              // case where password needs to be updated
              data.mobileNo = req.body.mobile;
          }
          if(req.body.userid !== undefined) {
            // case where password needs to be updated
            data.userid = req.body.userid;
        }
          // save the data
          data.save(function(err){
              if(err) {
                  response = {"error" : true,"message" : "Error updating data"};
              } else {
                  response = {"error" : false,"message" : "Data is updated for "+req._id};
              }
              res.json(response);
          })
      }
  });
}






  


module.exports.forgotpassword = (req,res) =>{
  let response = {};
  User.findOne({ userid: req.body.userid }, function (err, user) {
    if (err) {
      res.json({ success: false, message: err });
    } else if (user == null) {
      res.json({ success: false, message: 'User is not exist.' });
    } else {
      
      let token = crypto.randomBytes(20).toString('hex');
      User.findOneAndUpdate({ userid: user.userid }, { $set: { reset_password_token: token, }, }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        const mailOptions = {
          from: 'mySqlDemoEmail@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + 'http://localhost:4200/resetpassword/' + token + '\n\n'
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };
        console.log('sending mail');

        transport.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json({ success: true, message: 'Recovery email has been sent.' });
          }
        });
      });
    }
  });
}
    

module.exports.resetpassword = (req,res) =>{
      User.findOne({ reset_password_token: req.params.resetPasswordToken }, (err, user) => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(201).send({ success: false, message: 'password reset link is invalid or has expired' });
        } else {
          res.status(200).send({
            success: true,
            email: user.userid,
            message: 'password reset link is ok',
          });
        }
        
      });
    }


    module.exports.updatepassword = (req,res) =>{
      User.findOne({ resetPasswordToken: req.params.token, }, (err, user) => {
        if (user == null) {
          res.json({ success: false, message: 'User is not exist.' });
         
        } else {
          req.body.password = bcrypt.hashSync(req.body.password,salt);
          User.findOneAndUpdate({ resetPasswordToken: req.params.token }, { $set: { password: req.body.password } }, { new: true }, (err, user) => {
            res.json({ success: true, message: 'password updated successfully.' });
            const mailOptions = {
              from: 'mySqlDemoEmail@gmail.com',
              to: `${user.email}`,
              subject: 'Password has been changed',
              text:
                'Hi  '  + user.userid + ' Your password has been successfully reset.  Please login using new password.\n\n',
            };
            transport.sendMail(mailOptions, (err, response) => {
              if (err) {
                console.error('there was an error: ', err);
              } else {
                console.log('here is the res: ', response);
                res.status(200).json({ success: true, message: 'Update status email has been sent.' });
              }
            });
          })
        }
       
      });
    };

