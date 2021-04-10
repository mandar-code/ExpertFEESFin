const mongoose = require('mongoose');
var express = require('express');
var ApplicationForm = require('./../models/applicationFormModel');
const User = mongoose.model('User');
var multer = require('multer');
const _ = require('lodash');

module.exports.applicationform = (req, res, next) => {
    var response = {};
    let newApplicationForm = new ApplicationForm(req.body);
    User.findOne({ user: req.body._id}, function (err, user) {
        if (err) {
            response = { success: false, message: err };
        } else {
            if(user == null ) {
                response = { success: true, message: 'user is not exist' };
            } else{
                newApplicationForm.user = user._id;
                newApplicationForm.save();
                response = { success: true, message: 'application form submitted successfully' };
            }
        }
        res.json(response);
    });
}

module.exports.getapplicationform = (req, res, next) =>{
    ApplicationForm.findOne({  user: req.body.id },
        (err, appForm) => {
            if (!appForm)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, data: appForm });
        }
    );
}

module.exports.getApplications =(req,res,next)=>{
    ApplicationForm.find({},function(err,users){ 
        res.json(users);
    });
  };


module.exports.updateapplicationform = (req, res, next) => {
    var response = {};
    ApplicationForm.findOneAndUpdate({ user: req.body.id },function(err,appForm,doc){
        if (err){
            response = { success: false, message: err };
            console.log(err);
        } else{
            if (appForm == null){
                response = { success: true, message: 'Application form is not exist' };
                console.log('Application form is not exist')
            }
            else{
                doc.name = req.body;
                doc.save();
                response = { success: true, message: 'application form updates successfully' };
            }
        }
    }
        
 )}

  

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname.split('.', 1) + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowed.'
        }, false);
    }
};

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100000
    }
})

var cpUpload = upload.fields([
    { name: 'aadhar1' },
    { name: 'rationcard' },
    { name: 'firstterm', maxCount: 3 },
    { name: 'secondterm', maxCount: 3 },
    
])

/* file upload */
module.exports.upload = (req, res, next) => {
    cpUpload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            res.status(500);
            if (error.code == 'LIMIT_FILE_SIZE') {
                error.message = 'File Size is too large. Allowed file size is 1MB';
                error.success = false;
            }
            return res.json(error);
            // A Multer error occurred when uploading.
        } else if (error) {
            res.json(error)
        } else {
            if (!req.files) {
                res.status(500);
               
                console.log(res);
            }
            res.status(200);
            res.json({
                success: true,
                message: req.files
                
            });
        }
    });
}
