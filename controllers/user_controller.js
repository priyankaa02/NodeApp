var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var User = require('../models/usermodel');
const bcrypt = require('bcrypt');
var db = require('../database_config/db_connect');
var moment = require('moment');
const jwt = require('jsonwebtoken');
let config = require('../config');


exports.register = function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash){
     if(err) {
        return res.status(500).json({
           error: err
        });
     }
     else {
        const user = new User({
           full_name: req.body.full_name,
           email: req.body.email,
           password: hash,
           created_date : moment().format('YYYY-MM-DD HH:mm:ss Z')
        });
        user.save().then(function(result) {
           console.log(result);
           res.status(200).json({
              success: 'New user has been created',
              user: user
           });
        }).catch(error => {
           res.status(500).json({
              error: err
           });
        });
     }
  });
};

exports.sign_in = function(req, res) {
  User.findOne({email: req.body.email})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
         if(err) {
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         }
         if(result) {
           const JWTToken = jwt.sign({
      email: user.email,
      _id: user._id
    },
    config.secret,
     {
       expiresIn: '1m'
     });
     return res.status(200).json({
       success: 'Welcome to the Search App',
       token: JWTToken
     });
         }
         return res.status(401).json({
            failed: 'Unauthorized Access'
         });
      });
   })
   .catch(error => {
      res.status(500).json({
         error: error
      });
   });;
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
