const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

/* course model */
var courseSchema = new Schema({
    course_name: { type: String, lowercase: true, trim: true },
    category_name:{type:String,lowercase:true,trim:true},
    updated_at: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
});

module.exports = Course = mongoose.model('Course', courseSchema)
    

