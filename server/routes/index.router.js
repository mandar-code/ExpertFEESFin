const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

//controllers//
const ctrlUser = require('../controllers/user.controller');
const ctrlCourse = require('../controllers/course.controller');
const ctrlGetcourse = require('../controllers/course.controller');
const ctrlApplicationform = require('../controllers/applicationform.controller');
const ctrlGetapplicationform = require('../controllers/applicationform.controller');
const ctrlupdateapplicationform = require('../controllers/applicationform.controller');

//admin//
const ctrlAdmin = require('../controllers/admin.controller');
router.post('/adminlogin',ctrlAdmin.adminlogin);

//user controllers routes//
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getUsers',ctrlUser.getUsers);
router.put('/updateProfile',jwtHelper.verifyJwtToken,ctrlUser.updateProfile);
router.post('/forgotpassword',ctrlUser.forgotpassword);
router.post('/resetpassword/:token',ctrlUser.resetpassword);
router.post('/updatepassword',ctrlUser.updatepassword);



//course controllers routes//
router.post('/course', ctrlCourse.course);
router.get('/getcourse',ctrlGetcourse.getcourse);

//applicationform controllers routes//
router.post('/applicationform',ctrlApplicationform.applicationform);
router.get('/getApplications',ctrlApplicationform.getApplications);
router.get('/getapplicationform',jwtHelper.verifyJwtToken,ctrlGetapplicationform.getapplicationform);
router.put('/updateapplicationform',jwtHelper.verifyJwtToken,ctrlupdateapplicationform.updateapplicationform)
router.post('/upload',ctrlApplicationform.upload);


//upload application form










module.exports = router;



