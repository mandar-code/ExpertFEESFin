const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
var Course = require('./../models/courseModel');
var express = require('express');

module.exports.course = (req, res, next) => {
    let response = {};
    Course.find(function (err, courses) {
      if (err) {
        response = { success: false, message: err };
      } else {
        response = { success: true, data: courses };
      }
      return res.json(response);
    });
  }

  module.exports.getcourse = (req,res,next)=>{
  let response = {};
    let newCourse = new Course(req.body)
    newCourse.save(function (err, courses) {
      if (err) {
        response = { success: false, message: err };
      } else {
        response = { success: true, message: 'course added successfully' };
      }
      return res.json(response);
    });
  }